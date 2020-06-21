require('dotenv').config()
const express = require('express')

const app = express();
require('./services/sequelize.service').init();



const port = process.env.port || 3000;
app.listen(port ,()=> {
    console.log(`Server is running at ${port}`)
})