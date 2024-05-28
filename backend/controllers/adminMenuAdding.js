const client = require('../model/Schema').client; 

const adminMenuAdding = async(req,res)=>{
    const { date, lunchOption } = req.body;
    try {
        const result = await client.query(
            'INSERT INTO menus (menu_date, lunch_option) VALUES ($1, $2) RETURNING *',
            [date, lunchOption]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}
module.exports = {adminMenuAdding};