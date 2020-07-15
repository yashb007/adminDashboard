const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Language = require('../Language/model')
const Country = require('../Country/model')
const Governorate = Sequelize.define('Governorate',
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
        Status:{
            type:sequelize.BOOLEAN,
            defaultValue:false
        }
       
    },
    {
        indexes: [{unique: true, fields: ['Name']}]
    }
);


Language.hasMany(Governorate);
Governorate.belongsTo(Language);

Country.hasMany(Governorate);
Governorate.belongsTo(Country);

module.exports = Governorate;