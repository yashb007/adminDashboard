const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
console.log("Connection for currency")
const Currency = Sequelize.define('Currency',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        currency: {
            type: sequelize.STRING,
            allowNull: false
        },
        coins:{
            type: sequelize.INTEGER ,
            allowNull: false
        },
        Status:{
            type:sequelize.BOOLEAN,
            defaultValue:false
        }

    },
    {
        indexes: [{unique: true, fields: ['currency']}]
    }
);


module.exports = Currency;