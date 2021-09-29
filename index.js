//DECLARATION

const express = require('express');
const app = express();

const { registerRoutes } = require('./routes'); 

const port = 5000;

//CONFIGURATION

app.use(express.json());

//MIDDLEWARE

//ROUTES

registerRoutes(app);

//SERVER

app.listen(port, () => {
    console.log(`Server Started at port ${port}...`);
})
