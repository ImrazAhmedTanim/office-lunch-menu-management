const client = require('../model/Schema').client;

const selectLunch = async (req, res) => {
    const { date, lunchOption } = req.body;
    const employeeId = req.user.id; // assuming the user id is stored in req.user.id after authentication

    try {
        // Find the menu item for the given date and lunch option
        const menuResult = await client.query('SELECT id FROM menus WHERE menu_date = $1 AND lunch_option = $2', [date, lunchOption]);
        
        if (menuResult.rows.length === 0) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        const menuId = menuResult.rows[0].id;

        // Insert the choice into employee_choices table
        const insertResult = await client.query(
            'INSERT INTO employee_choices (employee_id, menu_id, choice_date) VALUES ($1, $2, $3) RETURNING *',
            [employeeId, menuId, date]
        );

        res.status(200).json(insertResult.rows[0]);
    } catch (error) {
        console.error('Error selecting lunch option:', error);
        res.status(500).json({ message: 'Failed to select lunch option', error: error.message });
    }
};

module.exports = { selectLunch };