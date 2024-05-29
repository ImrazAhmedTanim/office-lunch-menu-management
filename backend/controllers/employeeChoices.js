const client = require('../model/Schema').client; 

const employeeChoices =   async (req, res) => {
    try {
        const result = await client.query(`
            SELECT e.name as employeeName, c.choice_date as date, m.lunch_option as lunchOption
            FROM employee_choices c
            JOIN employees e ON c.employee_id = e.id
            JOIN menus m ON c.menu_id = m.id
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {employeeChoices}