const express = require('express');
const router = express.Router();
const model = require('./model');
const { validateRequest } = require('./validator');
const Response = require('./utils/response');
const logger = require('./utils/logger');

router.get('/', async (req, res) => {
	logger.info(`ACCOUNT-CONTROLLER::GETALL`);
	const response = new Response(res);

	try {
		const accounts = await model.getAll();
		return response.ok(accounts);
	} catch (error) {
		logger.error(`ACCOUNT-CONTROLLER::GETALL`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

router.get('/:accountNumber', async (req, res) => {
	logger.info(`ACCOUNT-CONTROLLER::GET`);
	const response = new Response(res);

	try {
		const id = req.params.accountNumber;
		const account = await model.get(id);
		if (!account) return response.notFound({ message: 'Account not found' });

		const customer = await model.getCustomer(account.owner);
		account.owner =customer;

		return response.ok(account);
	} catch (error) {
		logger.error(`ACCOUNT-CONTROLLER::GET`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

router.post('/', async (req, res) => {
	logger.info(`ACCOUNT-CONTROLLER::INSERT`);
	const response = new Response(res);
	try {
		const { data, error } = validateRequest(req, 'create');
		if (error) return response.badRequest(error);

		const { accountNumber,accountName,accountType, balance, owner } = data;
		const customer = await model.getCustomer(owner);
		if (!customer) return response.badRequest({message: 'Owner not found'});

		const account = await model.add({accountNumber,accountName,accountType, balance, owner});
		return response.created(account);
	} catch (error) {
		logger.error(`ACCOUNT-CONTROLLER::INSERT`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

router.put('/:accountNumber', async (req, res) => {
	logger.info(`ACCOUNT-CONTROLLER::UPDATE`);
	const response = new Response(res);

	try {
		const { data, error } = validateRequest(req, 'update');
		if (error) return response.badRequest(error);

		const id = req.params.accountNumber;
		const account = await model.get(id);
		if (!account) return response.notFound({ message: 'Account not found' });

		const payload = { ...data };
		await model.update(payload, id);
		return response.ok({ message: 'Record successfully updated' });
	} catch (error) {
		logger.error(`ACCOUNT-CONTROLLER::UPDATE`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

router.delete('/:accountNumber', async (req, res) => {
	logger.info(`ACCOUNT-CONTROLLER::DELETE`);
	const response = new Response(res);

	try {
		const id = req.params.accountNumber;
		const account = await model.get(id);
		if (!account) return response.notFound({ message: 'Account not found' });

		await model.remove(id);
		return response.noContent();
	} catch (error) {
		logger.error(`ACCOUNT-CONTROLLER::DELETE`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

module.exports = router;
