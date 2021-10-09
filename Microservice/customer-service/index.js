//DECLARATION

const express = require('express');
const app = express();

const { registerRoutes } = require('./routes'); 

const port = 3001;

//CONFIGURATION

app.use(express.json());

//MIDDLEWARE

app.use('/',(req,res,next)=>{ 
    next();
})

//ROUTES

registerRoutes(app);

//SERVER

app.listen(port, () => {
    console.log(`Server Started at port ${port}...`);
})
