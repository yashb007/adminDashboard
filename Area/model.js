const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();

const Area = Sequelize.define('Area',
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
        AreaCode:{
            type: sequelize.INTEGER ,
            allowNull: false
        },
        PinCode:{
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

module.exports = Area;