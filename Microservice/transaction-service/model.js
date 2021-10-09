const db = require('./db');
const logger = require('./utils/logger');
const moment = require('moment');
const axios = require('axios');
const { services } = require('./config.json');

const tableName = 'transactions';
const idColumn = 'transactionId';

const deposit = async (data) => {
	logger.info(`TRANSACTION-MODEL::deposit()`);
	const now = moment().format('YYYY-MM-DD HH:mm:ss');
	const { accountNumber, transactionType, amount, remarks } = data;
	let sql = `INSERT INTO ${tableName} VALUES (null,?,?,?,?,?)`;
	const createTransaction = await db.query(sql, [accountNumber, transactionType, amount, now, remarks]);
	sql = `UPDATE accounts SET balance=balance+?, lastTransactionAt=? WHERE accountNumber=?`;
	await db.query(sql, [amount, now, accountNumber]);
	return createTransaction;
};

const withdraw = async (data) => {
	logger.info(`TRANSACTION-MODEL::deposit()`);
	const now = moment().format('YYYY-MM-DD HH:mm:ss');
	const { accountNumber, transactionType, amount, remarks } = data;
	let sql = `INSERT INTO ${tableName} VALUES (null,?,?,?,?,?)`;
	const createTransaction = await db.query(sql, [accountNumber, transactionType, amount, now, remarks]);
	sql = `UPDATE accounts SET balance=balance-?, lastTransactionAt=? WHERE accountNumber=?`;
	await db.query(sql, [amount, now, accountNumber]);
	return createTransaction;
};

const transfer = async (data) => {
	logger.info(`TRANSACTION-MODEL::transfer()`);
	const now = moment().format('YYYY-MM-DD HH:mm:ss');
	const { senderAccountNumber, receiverAccountNumber, transactionType, amount, remarks } = data;

	try {
		await db.beginTransaction();
		await deposit({ accountNumber: receiverAccountNumber, transactionType, amount, remarks: `SENDER: ${senderAccountNumber};${remarks}` });
		await withdraw({ accountNumber: senderAccountNumber, transactionType, amount, remarks: `RECEIVER: ${receiverAccountNumber};${remarks}` });
		await db.commit();
	} catch (error) {
		await db.rollback();
		throw error;
	}
};

const getAccount = async (id) => {
	logger.info(`TRANSACTION-MODEL::getAccount()`);
	try {
		const url = `${services.account}/${id}`;
		const response = await axios.get(url);
		return response.data;
	} catch (error) {
		logger.error(error);
		return null;
	}
};

module.exports = { deposit, withdraw, transfer, getAccount };
