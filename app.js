require('dotenv').config()
const express = require('express')

const app = express();
require('./services/sequelize.service').init();
require('./services/passport.services')();
app.use(express.json());


app.use('/admin', require('./admin/router'));
app.use('/user', require('./user/router'));
app.use('/seller', require('./seller/router'));
app.use('/language', require('./Language/router'));
app.use('/topup', require('./TopUp/router'));
app.use('/package', require('./Package/router'));


const port = process.env.port || 3000;
app.listen(port ,()=> {
    console.log(`Server is running at ${port}`)
})