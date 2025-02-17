const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const context = async ({ request }) => {
    const token = request.headers.authorization || '';
    try {
        const { userId, role } = jwt.verify(token, JWT_SECRET);
        return { userId, role };
    } catch {
        return {};
    }
};

module.exports = {
    context,
};
