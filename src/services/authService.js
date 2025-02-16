import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';

dotenv.config();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_ID = process.env.GOOGLE_ID;
const googleClient = new OAuth2Client(GOOGLE_ID);

export const authService = {
    signUp: async (_, { email, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword, role: 'USER' },
        });
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            {
                expiresIn: '7d',
            },
        );
        return { token, id: user.id, email: user.email };
    },

    login: async (_, { email, password }) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
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

        const jwtToken = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
        );
        return {
            token: jwtToken,
            id: user.id,
            email: user.email,
        };
    },
};
