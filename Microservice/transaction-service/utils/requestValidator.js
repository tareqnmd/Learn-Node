const Validator = require('fastest-validator');

const validate = (req, rule) => {
	if (Object.keys(req.body).length === 0) {
		return {
			error: { message: 'Request body cannot be empty.' },
		};
	}

	const v = new Validator();
	const result = v.validate(req.body, rule);

	if (result !== true) {
		return { error: result };
	} else {
		return { data: { ...req.body } };
	}
};

module.exports = { validate };
