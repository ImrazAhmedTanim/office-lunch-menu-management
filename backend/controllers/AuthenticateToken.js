const client = require('../model/Schema').client; 
const jwt = require('jsonwebtoken');

const jwtSecret = require('../config').jwtSecret;

const authenticateToken = async (req, res, next) => {
    try {
        const tok = req.headers.authorization;

        if (!tok) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const token = tok.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);

        const id = decoded.id;

        const result = await client.query('SELECT * FROM employees WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = result.rows[0]; // Attach user information to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
module.exports = {authenticateToken}