//DECLARATION

const express = require('express');
const app = express();

//CONFIGURATION
//MIDDLEWARE
//ROUTES

app.get('/', (req, res) => {
    res.send('Welcome to the Node.js')
})

//SERVER

app.listen(5000, () => {
    console.log('Server Started');
})
