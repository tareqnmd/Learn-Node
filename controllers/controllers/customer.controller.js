const express = require('express');
const router = express.Router();
const db = require('../models/db')

router.get('/', async (req, res) => {
    const sql = 'SELECT * FROM CUSTOMERS';
    const customers = await db.query(sql) ;
    res.json(customers);
});

router.post('/', (req, res) => {
    const { name, email } = req.body;
    res.json(`Customers ${name} and Email ${email}`);
});

module.exports = router;
