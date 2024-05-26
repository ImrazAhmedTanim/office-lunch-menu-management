const jwt = require('jsonwebtoken');
const jwtSecret = require('../config').jwtSecret;

const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
    };

    try {
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw error;
    }
};

module.exports = generateToken ;