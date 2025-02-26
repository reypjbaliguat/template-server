const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const jwtUtils = {
    sign: (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' }),
    verify: (token) => jwt.verify(token, JWT_SECRET),
};

module.exports = {
    jwtUtils,
};
