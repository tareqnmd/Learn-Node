const mysql = require('mysql');
const Bluebird = require('bluebird');

const config =require('./config.json')

const connection = mysql.createConnection(config.rds);
connection.query = Bluebird.promisify(connection.query);

module.exports = connection;
