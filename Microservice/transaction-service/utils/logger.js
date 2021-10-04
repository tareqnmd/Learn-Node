const winston = require('winston');
const config = require('../config.json');
const defaultDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
 
const logger = new winston.createLogger({
  level: config.logLevel || 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
    winston.format.timestamp({ format: defaultDateTimeFormat }),
    winston.format.printf(log => `${log.timestamp} ${log.level}: ${log.message}`),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger;
