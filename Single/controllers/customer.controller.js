const express = require('express');
const router = express.Router();
const model = require('../models/customer.model');
const { validateRequest } = require('./customer.validator');
const Response = require('../utils/response');
const logger = require('../utils/logger');

router.get('/', async (req, res) => {
	logger.info(`CUSTOMER-CONTROLLER::GETALL`);
	const response = new Response(res);

	try {
		const customers = await model.getAll();
		return response.ok(customers);
	} catch (error) {
		logger.error(`CUSTOMER-CONTROLLER::GETALL`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

router.get('/:customerId', async (req, res) => {
	logger.info(`CUSTOMER-CONTROLLER::GET`);
	const response = new Response(res);

	try {
		const id = req.params.customerId;
		const customer = await model.get(id);
		if (!customer) return response.notFound({ message: 'Customer not found' });
		return response.ok(customer);
	} catch (error) {
		logger.error(`CUSTOMER-CONTROLLER::GET`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

router.post('/', async (req, res) => {
	logger.info(`CUSTOMER-CONTROLLER::INSERT`);
	const response = new Response(res);

	try {
		const { data, error } = validateRequest(req, 'create');
		if (error) return response.badRequest(error);

		const { customerName, email, phone } = data;
		const customer = await model.add({ customerName, email, phone });
		return response.created(customer);
	} catch (error) {
		logger.error(`CUSTOMER-CONTROLLER::INSERT`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

router.put('/:customerId', async (req, res) => {
	logger.info(`CUSTOMER-CONTROLLER::UPDATE`);
	const response = new Response(res);

	try {
		const { data, error } = validateRequest(req, 'update');
		if (error) return response.badRequest(error);

		const id = req.params.customerId;
		const customer = await model.get(id);
		if (!customer) return response.notFound({ message: 'Customer not found' });

		const payload = { ...data };
		await model.update(payload, id);
		return response.ok({ message: 'Record successfully updated' });
	} catch (error) {
		logger.error(`CUSTOMER-CONTROLLER::UPDATE`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

router.delete('/:customerId', async (req, res) => {
	logger.info(`CUSTOMER-CONTROLLER::DELETE`);
	const response = new Response(res);

	try {
		const id = req.params.customerId;
		const customer = await model.get(id);
		if (!customer) return response.notFound({ message: 'Customer not found' });

		await model.remove(id);
		return response.noContent();
	} catch (error) {
		logger.error(`CUSTOMER-CONTROLLER::DELETE`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

module.exports = router;
