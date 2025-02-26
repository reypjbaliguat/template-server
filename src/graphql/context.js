const dotenv = require('dotenv');
const { jwtUtils } = require('../utils/jwt');

dotenv.config();

const context = async ({ req }) => {
    const token =
        (req.headers &&
            req.headers.authorization &&
            req.headers.authorization.split(' ')[1]) ||
        '';
    try {
        const { id } = jwtUtils.verify(token);
        return { userId: id };
    } catch {
        return {};
    }
};

module.exports = {
    context,
};
