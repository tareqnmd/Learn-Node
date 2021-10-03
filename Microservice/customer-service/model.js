const db = require('./db');
const logger = require('./utils/logger');

const tableName = 'customers';
const idColumn = 'customerId';

const getAll = async () => {
	logger.info(`CUSTOMER-MODEL::getAll()`);
	const sql = `SELECT * FROM ${tableName}`;
	const customers = await db.query(sql);
	return customers;
};

const get = async (id) => {
	logger.info(`CUSTOMER-MODEL::get()`);
	const sql = `SELECT * FROM ${tableName} WHERE ${idColumn}=${db.escape(id)}`;
	const customer = await db.query(sql);
	return customer.length > 0 ? customer[0] : null;
};

const add = async (data) => {
	logger.info(`CUSTOMER-MODEL::add()`);
	const { customerName, email, phone } = data;
	const sql = `INSERT INTO ${tableName} VALUES (null,?,?,?)`;
	const createCustomer = await db.query(sql,[customerName,phone,email]);
	return createCustomer;
};

const update = async (data,id) => {
	logger.info(`CUSTOMER-MODEL::update()`);
	const sql = `UPDATE ${tableName} SET ? WHERE ${idColumn}=${id}`;
	const createCustomer = await db.query(sql,data);
	return createCustomer;
};

const remove = async (id) => {
	logger.info(`CUSTOMER-MODEL::remove()`);
	const sql = `DELETE FROM ${tableName} WHERE ${idColumn}=${id}`;
	const deleteCustomer = await db.query(sql);
	return deleteCustomer;
};


module.exports = { getAll, get, add, update, remove };
