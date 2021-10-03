const controller = require('./controller');

const registerRoutes = (app) => {
	app.use('/', controller);
};

module.exports = { registerRoutes };
