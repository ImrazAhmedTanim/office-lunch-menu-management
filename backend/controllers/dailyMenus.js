const client = require('../model/Schema').client; 

const dailyMenus = async (req, res) => {
    const { date } = req.query;
    try {
        const result = await client.query('SELECT * FROM menus WHERE menu_date = $1', [date]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {dailyMenus};