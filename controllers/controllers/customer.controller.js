const express = require('express');
const router = express.Router();
const model = require('../models/customer.model');

router.get('/', async (req, res) => {
	const customers = await model.getAll();
	res.json(customers);
});

router.get('/:customerId', async (req, res) => {
	const id = req.params.customerId;
	const customer = await model.get(id);
    if (!customer) return res.json({message: 'No customer Found'});
	res.json(customer);
});

router.post('/', async (req, res) => {
	const data = req.body;
	const createCustomer = await model.add(data);
	res.json(createCustomer);
});

router.put('/:customerId', async (req, res) => {
    const id = req.params.customerId;
	const customer = await model.get(id);
    if (!customer) return res.json({message: 'No customer Found'});

	const data = {...req.body};
	const updateCustomer = await model.update(data,id);
	res.json({message : "Record Successfully Updated"});
});

router.delete('/:customerId', async (req, res) => {
    const id = req.params.customerId;
	const customer = await model.get(id);
    if (!customer) return res.json({message: 'No customer Found'});

	const updateCustomer = await model.remove(id);
	res.json({message : "Record Successfully Deleted"});
});

module.exports = router;
