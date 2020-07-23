const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Currency = Sequelize.define('Currency',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        Currency: {
            type: sequelize.STRING,
            allowNull: false
        },
        Coins:{
            type: sequelize.INTEGER ,
            allowNull: false
        },
        Status:{
            type:sequelize.BOOLEAN,
            defaultValue:false
        }

    },
    {
        indexes: [{unique: true, fields: ['Name']}]
    }
);


module.exports = Currency;