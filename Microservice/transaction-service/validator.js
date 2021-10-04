const { validate } = require('./utils/requestValidator');

const rules = {
	deposit: {
		accountNumber : { type: 'string', max: 15, empty: false },
		transactionType: { type: 'string', enum: ['CREDIT']},
		amount: { type: 'number', positive: true, empty: false},
		remarks: { type: 'string', empty: false, optional: true},
	},
	withdraw: {
		accountNumber : { type: 'string', max: 15, empty: false },
		transactionType: { type: 'string', enum: ['DEBIT']},
		amount: { type: 'number', positive: true, empty: false},
		remarks: { type: 'string', empty: false, optional: true},
	}
};

const validateRequest = (req, ruleName) => {
	const rule = rules[ruleName];
	return validate(req, rule);
};

module.exports = {
	validateRequest,
};
