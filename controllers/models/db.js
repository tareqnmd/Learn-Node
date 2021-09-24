const mysql = require('mysql');
const Bluebird = require('bluebird');
require('dotenv').config();

// const config = {
// 	host: process.env.DB_HOST,
// 	port: process.env.DB_PORT,
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	database: process.env.DB_NAME
// };

const config =require('../../config.json')

const connection = mysql.createConnection(config.rds);
connection.query = Bluebird.promisify(connection.query);

module.exports = connection;
