const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const User = require('../user/model')
const Area = require('../Area/model')
const Address = Sequelize.define('Address',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        AddressTitle: {
            type: sequelize.STRING,
            allowNull: false
        },
        Block: {
            type: sequelize.STRING,
            allowNull: false
        },
        Street: {
            type: sequelize.STRING,
            allowNull: false
        },
        Avenue: {
            type: sequelize.STRING,
           
        },
        HouseNo:{
            type: sequelize.INTEGER ,
            allowNull: false
        },
        FloorNo :{
            type:sequelize.INTEGER ,
            defaultValue:0
        },
        FlatNo:{
            type:sequelize.INTEGER ,
            
        },
        Status:{
            type:sequelize.BOOLEAN,
            defaultValue:false
        },
        Lattitude:{
            type:sequelize.FLOAT ,
            allowNull: false
        },
        Longitude:{
            type:sequelize.FLOAT ,
            allowNull: false
        },
        Governerate: {
            type: sequelize.STRING,
            allowNull: false
        },
        Area: {
            type: sequelize.STRING,
            allowNull: false
        },
    },
    {
        indexes: [{unique: true, fields: ['AddressTitle']}]
    }
);


User.hasMany(Address);
Address.belongsTo(User);

// Area.hasMany(Address);
// Address.belongsTo(Area);

module.exports = Address;