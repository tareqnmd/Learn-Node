const db = require('./db');
const logger = require('./utils/logger');
const moment = require('moment');
const axios = require('axios');
const { services } = require('./config.json');

const tableName = 'accounts';
const idColumn = 'accountNumber';

const getAll = async () => {
	logger.info(`ACCOUNT-MODEL::getAll()`);
	const sql = `SELECT * FROM ${tableName}`;
	const accounts = await db.query(sql);
	return accounts;
};

const get = async (id) => {
	logger.info(`ACCOUNT-MODEL::get()`);
	const sql = `SELECT * FROM ${tableName} WHERE ${idColumn}=${db.escape(id)}`;
	const account = await db.query(sql);
	return account.length > 0 ? account[0] : null;
};

const add = async (data) => {
	logger.info(`ACCOUNT-MODEL::add()`);
	const now = moment().format('YYYY-MM-DD HH:mm:ss');
	const { accountNumber, accountName, accountType, balance, owner } = data;
	const sql = `INSERT INTO ${tableName} VALUES (?,?,?,?,?,?,?)`;
	const createAccount = await db.query(sql, [accountNumber, accountName, accountType, balance, now, now, owner]);
	return createAccount;
};

const update = async (data, id) => {
	logger.info(`ACCOUNT-MODEL::update()`);
	const sql = `UPDATE ${tableName} SET ? WHERE ${idColumn}=${id}`;
	const createAccount = await db.query(sql, data);
	return createAccount;
};

const remove = async (id) => {
	logger.info(`ACCOUNT-MODEL::remove()`);
	const sql = `DELETE FROM ${tableName} WHERE ${idColumn}=${id}`;
	const deleteAccount = await db.query(sql);
	return deleteAccount;
};

const getCustomer = async (id) => {
	logger.info(`ACCOUNT-MODEL::getCustomer()`);
	try {
		const url = `${services.customer}/${id}`;
		const response = await axios.get(url);
		return response.data;
	} catch(error) {
		logger.error(error);
		return null;
	}
};

module.exports = { getAll, get, add, update, remove, getCustomer };
