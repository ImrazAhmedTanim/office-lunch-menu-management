const client = require('../model/Schema').client;

const employeeChoices = async (req, res) => {
    const { page = 1, limit = 10, date } = req.query;
    const offset = (page - 1) * limit;

    try {
        let query = `
            SELECT e.name as employeeName, c.choice_date as date, m.lunch_option as lunchOption
            FROM employee_choices c
            JOIN employees e ON c.employee_id = e.id
            JOIN menus m ON c.menu_id = m.id
            WHERE 1=1
        `;
        let params = [limit, offset];

        if (date) {
            query += ` AND c.choice_date = $3 `;
            params.push(date);
        }

        query += `
            ORDER BY c.choice_date DESC
            LIMIT $1 OFFSET $2
        `;

        const result = await client.query(query, params);

        const countResult = await client.query(`
            SELECT COUNT(*) FROM employee_choices
        `);
        const totalItems = parseInt(countResult.rows[0].count, 10);
        const totalPages = Math.ceil(totalItems / limit);

        res.json({
            choices: result.rows,
            totalPages,
            currentPage: parseInt(page, 10),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { employeeChoices };