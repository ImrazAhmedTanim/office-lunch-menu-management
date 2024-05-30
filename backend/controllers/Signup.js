const bcrypt = require('bcrypt');
const client = require('../model/Schema').client;
const generateToken = require('./generateToken');

const signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check if the user already exists
        const userCheckResult = await client.query('SELECT * FROM employees WHERE email = $1', [email]);
        if (userCheckResult.rows.length > 0) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the employees table
        const insertUserResult = await client.query(
            'INSERT INTO employees (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );

        const newUser = insertUserResult.rows[0];

        // Assign the "user" role to the new user
        const userRoleResult = await client.query(
            'SELECT id FROM roles WHERE role_name = $1',
            ['user']
        );
        const userRoleId = userRoleResult.rows[0].id;

        await client.query(
            'INSERT INTO employee_roles (employee_id, role_id) VALUES ($1, $2)',
            [newUser.id, userRoleId]
        );

        newUser.role = 'user';  // Add role to the newUser object

        // Generate a JWT token
        const token = generateToken(newUser);

        res.status(200).json({ message: 'Signup successful', user: newUser, token });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { signup };