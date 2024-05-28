const bcrypt = require('bcrypt');
const client = require('../model/Schema').client; 
const generateToken = require('./generateToken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Received login request:', req.body);

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user exists
        const userCheckResult = await client.query('SELECT * FROM employees WHERE email = $1', [email]);
        if (userCheckResult.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = userCheckResult.rows[0];

        // Verify the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = generateToken(user);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {login};
