const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();

const Language = Sequelize.define('Language',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        Name: {
            type: sequelize.STRING,
            allowNull: false
        },
        LanguageCode:{
            type: sequelize.STRING,
            allowNull: false
        },
        Status:{
            type:sequelize.BOOLEAN,
            defaultValue:false
        }
       
    },
    {
        indexes: [{unique: true, fields: ['LanguageCode']}]
    }
);

module.exports = Language;