require('dotenv').config()
const express = require('express')

const app = express();
const cors = require("cors");
app.use(cors());
require('./services/sequelize.service').init();
require('./services/passport.services')();
app.use(express.json());


app.use('/admin', require('./admin/router'));
app.use('/user', require('./user/router'));
app.use('/seller', require('./seller/router'));
app.use('/language', require('./Language/router'));
app.use('/topup', require('./TopUp/router'));
app.use('/package', require('./Package/router'));
app.use('/country', require('./Country/router'));
app.use('/governorate', require('./Governorate/router'));
app.use('/area', require('./Area/router'));
app.use('/banner', require('./Banner/router'));
app.use('/address', require('./Address/router'));
app.use('/offer', require('./Offer/router'));
app.use('/posts', require('./Posts/router'));
app.use('/category', require('./category/router'));
app.use('/product', require('./Product/router'));
app.use('/media', require('./media/router'));
app.use('/brand', require('./Brand/router'));
app.use('/privacy', require('./Privacy/router'));
app.use('/terms', require('./Terms/router'));
app.use('/currency', require('./Currency/router'));

const port = process.env.port || 8029;
app.listen(port ,()=> {
    console.log(`Server is running at ${port}`)
})