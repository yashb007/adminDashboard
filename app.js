// require('dotenv').config()
const express = require('express')

const app = express();
const cors = require("cors");
app.use(cors());

const sequelize = require('./services/sequelize.service');
sequelize.connect()

require('./services/passport.services')();
app.use(express.json());
app.use(express.static(__dirname))


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

app.get('*', (req, res) => res.json({ working: "fine" }))
app.post('*', (req, res) => res.json({ working: "fine" }))


const port = process.env.port || 8029;

    sequelize.connection()
        .authenticate()
        .then(() => {
            return sequelize.connection().sync({alter: true, force: false})
        })
        .then(() => {
            console.log(process.versions)
            app.listen(port, () => {
                console.log(`Server is running at ${port}`)
            })
        })
        .catch(err => console.error(err))

module.exports = app


