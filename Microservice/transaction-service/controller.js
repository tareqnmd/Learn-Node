const express = require('express');
const router = express.Router();
const model = require('./model');
const { validateRequest } = require('./validator');
const Response = require('./utils/response');
const logger = require('./utils/logger');

router.post('/deposit', async (req, res) => {
	logger.info(`TRANSACTION-CONTROLLER::DEPOSIT`);
	const response = new Response(res);
	try {
		const { data, error } = validateRequest(req, 'deposit');
		if (error) return response.badRequest(error);

		const { accountNumber, transactionType, amount, remarks } = data;
		const account = await model.getAccount(accountNumber);
		if (!account) return response.badRequest({message: 'Account not found'});

		const transaction = await model.deposit({ accountNumber, transactionType, amount, remarks});

		const responsePayload= {
			transactionId: transaction.insertId,
			type: 'DEPOSIT',
			message: 'Transaction Successful',
		}

		return response.created(responsePayload);
	} catch (error) {
		logger.error(`TRANSACTION-CONTROLLER::DEPOSIT`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

router.post('/withdraw', async (req, res) => {
	logger.info(`TRANSACTION-CONTROLLER::WITHDRAW`);
	const response = new Response(res);
	try {
		const { data, error } = validateRequest(req, 'withdraw');
		if (error) return response.badRequest(error);

		const { accountNumber, transactionType, amount, remarks } = data;
		const account = await model.getAccount(accountNumber);
		if (!account) return response.badRequest({message: 'Account not found'});

		if(account.balance -amount <0) return response.badRequest({message: 'Not enough balance'});

		const transaction = await model.withdraw({ accountNumber, transactionType, amount, remarks});

		const responsePayload= {
			transactionId: transaction.insertId,
			type: 'WITHDRAW',
			message: 'Transaction Successful',
		}

		return response.created(responsePayload);
	} catch (error) {
		logger.error(`TRANSACTION-CONTROLLER::WITHDRAW`);
		const message = error.message ? error.message : 'Server error';
		response.internalServerError({ message });
	}
});

module.exports = router;
