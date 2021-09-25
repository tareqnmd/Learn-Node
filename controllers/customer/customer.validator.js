const Validator = require('fastest-validator');

const rules = {
	create: {
		customerName: { type: 'string', empty: false },
		phone: { type: 'string', empty: false },
		email: { type: 'string', email: false, optional: true },
	},
	update: {},
};

const v = new Validator();

const validateRequest = (req, ruleName) => {
	const result = v.validate(req.body, rules[ruleName]);
	
	if (result !== true) {
		return { error: result };
	} else {
		return { data: { ...req.body } };
	}
};

module.exports = { validateRequest };
