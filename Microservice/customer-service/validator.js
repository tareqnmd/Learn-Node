const { validate } = require('./utils/requestValidator');

const rules = {
	create: {
		customerName: { type: 'string', empty: false },
		phone: { type: 'string', empty: false },
		email: { type: 'string', empty: false, optional: true },
	},
	update: {
		customerName: { type: 'string', empty: false, optional: true },
		phone: { type: 'string', empty: false, optional: true },
		email: { type: 'string', empty: false, optional: true },
	},
};

const validateRequest = (req, ruleName) => {
	const rule = rules[ruleName];
	return validate(req, rule);
};

module.exports = {
	validateRequest,
};
