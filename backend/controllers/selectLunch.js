const client = require('../model/Schema').client; 

const selectLunch =  async (req, res) => {
    const {  employeeId,menuId, date } = req.body;

    try {
        const result = await client.query(
            'INSERT INTO employee_choices (employee_id, menu_id, choice_date) VALUES ($1, $2, $3) RETURNING *',
            [employeeId, menuId, date]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {selectLunch};