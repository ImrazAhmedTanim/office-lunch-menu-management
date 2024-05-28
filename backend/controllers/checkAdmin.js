const client = require('../model/Schema').client;

const checkAdmin = async (req, res, next) => {
    try {
        const result = await client.query(
            'SELECT r.role_name FROM roles r JOIN employee_roles er ON r.id = er.role_id WHERE er.employee_id = $1',
            [req.user.id]
        );
        if (!result.rows.some(role => role.role_name === 'admin')) {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }
        next();
    } catch (error) {
        console.error('Error checking admin role:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {checkAdmin};