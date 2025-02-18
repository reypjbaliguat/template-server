const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const context = async ({ req }) => {
    const token = req.headers.authorization.split(' ')[1] || '';
    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        return { userId: id };
    } catch {
        return {};
    }
};

module.exports = {
    context,
};
