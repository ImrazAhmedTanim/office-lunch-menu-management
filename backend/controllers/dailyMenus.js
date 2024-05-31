const client = require('../model/Schema').client;

const dailyMenus = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Date is required' });
    }

    try {
        const result = await client.query('SELECT * FROM menus WHERE menu_date = $1', [date]);
        if (result.rows.length > 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({ message: 'No menu found for the selected date' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { dailyMenus };