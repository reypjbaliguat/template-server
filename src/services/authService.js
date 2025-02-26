const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
const { PrismaClient } = require('@prisma/client');
const { generateOTP, generateOTPHTMLemail } = require('../utils/otp');
const nodemailer = require('nodemailer');
const { jwtUtils } = require('../utils/jwt');

dotenv.config();
const prisma = new PrismaClient();
const GOOGLE_ID = process.env.GOOGLE_ID;
const googleClient = new OAuth2Client(GOOGLE_ID);

const authService = {
    signUp: async (_, { email, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const otpCode = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser && existingUser.isVerified) {
            throw new Error(
                `User ${existingUser.email} already exist. Please try to login.`,
            );
        }

        // Check if the last OTP request was made within the cool-down period (e.g., 1 minute)
        const coolDownPeriod = 1 * 60 * 1000; // 1 minute in milliseconds
        if (
            existingUser &&
            existingUser.lastOtpRequest &&
            new Date() - existingUser.lastOtpRequest < coolDownPeriod
        ) {
            throw new Error(
                'You are requesting OTP too frequently. Please wait for 1 min before trying again.',
            );
        }

        await prisma.user.upsert({
            where: { email },
            update: {
                password: hashedPassword,
                otpCode,
                otpExpires,
                isVerified: false,
                lastOtpRequest: new Date(),
            },
            create: {
                email,
                password: hashedPassword,
                otpCode,
                otpExpires,
                isVerified: false,
                lastOtpRequest: new Date(),
            },
        });
        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: 'Template reypjbaliguat@gmail.com',
            to: email,
            subject: 'Your OTP Code',
            html: generateOTPHTMLemail(otpCode),
        });
        return 'OTP sent successfully. Please check your email.';
    },

    login: async (_, { email, password }) => {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        if (!user.isVerified) {
            throw new Error(
                'Your account is not verified please check your email for verification.',
            );
        }

        const token = jwtUtils.sign({ id: user.id, email: user.email });

        return { token, id: user.id, email: user.email };
    },

    googleLogin: async (_, { token }) => {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: GOOGLE_ID,
        });

        const payload = ticket.getPayload();
        const email = payload.email;

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: { email, password: '' }, // No password needed for Google users
            });
        }

        const jwtToken = jwtUtils.sign({ id: user.id, email: user.email });

        return {
            token: jwtToken,
            id: user.id,
            email: user.email,
        };
    },

    verifyOTP: async (_, { email, otpCode }) => {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.otpCode !== otpCode || user.otpExpires < new Date()) {
            throw new Error('Invalid or expired OTP.');
        }

        await prisma.user.update({
            where: { email },
            data: { isVerified: true, otpCode: null, otpExpires: null },
        });

        const token = jwtUtils.sign({ id: user.id, email: user.email });

        return { token, id: user.id, email: user.email };
    },

    resendOTP: async (_, { email }) => {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error('User not found.');
        }

        // Check if the last OTP request was made within the cool-down period (e.g., 1 minute)
        const coolDownPeriod = 1 * 60 * 1000; // 1 minute in milliseconds
        if (
            user.lastOtpRequest &&
            new Date() - user.lastOtpRequest < coolDownPeriod
        ) {
            throw new Error(
                'You are requesting OTP too frequently. Please wait before trying again.',
            );
        }

        // Generate a new OTP
        const otpCode = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

        // Update user with the new OTP and lastOtpRequest timestamp
        await prisma.user.update({
            where: { email },
            data: { otpCode, otpExpires, lastOtpRequest: new Date() },
        });

        // Resend OTP via email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: 'Template reypjbaliguat@gmail.com',
            to: email,
            subject: 'Your New OTP Code',
            html: generateOTPHTMLemail(otpCode),
        });

        return 'New OTP sent successfully.';
    },
};

module.exports = {
    authService,
};
