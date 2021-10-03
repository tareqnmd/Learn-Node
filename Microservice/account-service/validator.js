const { validate } = require('./utils/requestValidator');

const rules = {
	create: {
		accountNumber: { type: 'string', max: 15, empty: false },
		accountName: { type: 'string', max: 50, empty: false },
		accountType: { type: 'string', enum: ['SAVINGS', 'CREDIT', 'CURRENT', 'FIXED'], empty: false },
		balance: { type: 'number', positive: true, empty: false, optional: true, default: 0 },
		owner: { type: 'number', positive: true, integer: true, empty: false },
	},
	update: {
		accountName: { type: 'string', max: 50, empty: false, optional: true },
		accountType: { type: 'string', enum: ['SAVINGS', 'CREDIT', 'CURRENT', 'FIXED'], empty: false, optional: true },
		owner: { type: 'number', positive: true, integer: true, empty: false, optional: true },
	},
};

const validateRequest = (req, ruleName) => {
	const rule = rules[ruleName];
	return validate(req, rule);
};

module.exports = {
	validateRequest,
};
