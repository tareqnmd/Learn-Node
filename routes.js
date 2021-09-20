const customerController = require('./controllers/controllers/customer.controller');

const registerRoutes = (app) => {

    // customer controller
    app.use('/customers',customerController);

    // app homepage
    app.get('/', (req, res) => {
        res.send('Welcome to the Node.js')
    })
    
};

module.exports = {registerRoutes};