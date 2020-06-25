const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();

const User = Sequelize.define('User',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        email: {
            type: sequelize.STRING,
            allowNull: false
        },
        Name: {
            type: sequelize.STRING,
            allowNull: false
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        },
        DOB:{
            type: sequelize.STRING,
            allowNull: false
        },
        PhoneNo:{
            type: sequelize.STRING,
           
        },
        TotalPost:{
            type: sequelize.INTEGER ,
            defaultValue:0
        },
        TotalBiding:{
            type: sequelize.INTEGER ,
            defaultValue:0 
        },
        Status:{
            type:sequelize.BOOLEAN,
            defaultValue:false
        },
        wallet:{
            type:sequelize.INTEGER ,
            defaultValue:0
        },

    },
    {
        indexes: [{unique: true, fields: ['email']}]
    }
);

module.exports = User;