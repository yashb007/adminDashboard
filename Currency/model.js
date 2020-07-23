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
            type: sequelize.INTEGER,
            allowNull: false
        },
        Coins:{
            type: sequelize.INTEGER ,
            allowNull: false
        }

    },
    {
        indexes: [{unique: true, fields: ['Name']}]
    }
);


module.exports = Currency;