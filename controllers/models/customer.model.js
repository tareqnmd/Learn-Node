const db = require('./db');
const table = 'customers';
const uniqueId = 'customerId';

const getAll = async () => {
	const sql = `SELECT * FROM ${table}`;
	const customers = await db.query(sql);
	return customers;
};

const get = async (id) => {
	const sql = `SELECT * FROM ${table} WHERE ${uniqueId}=${db.escape(id)}`;
	const customer = await db.query(sql);
	return customer.length ? customer[0] : null;
};

const add = async (data) => {
	const { customerName, email, phone } = data;
	const sql = `INSERT into ${table} VALUES (null,?,?,?)`;
	const createCustomer = await db.query(sql,[customerName,email,phone]);
	return createCustomer;
};

const update = async (data,id) => {
	const sql = `UPDATE ${table} SET ? WHERE ${uniqueId}=${id}`;
	const createCustomer = await db.query(sql,data);
	return createCustomer;
};

const remove = async (id) => {
	const sql = `DELETE FROM ${table} WHERE ${uniqueId}=${id}`;
	const deleteCustomer = await db.query(sql);
	return deleteCustomer;
};


module.exports = { getAll, get, add, update, remove };
