const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Language = require('../Language/model')
const Offer = Sequelize.define('Offer',
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
        Discount:{
            type: sequelize.INTEGER ,
            allowNull: false
        },
        Validity:{
            type:sequelize.DATE,
            allowNull: true,
            defaultValue:'2015-02-12 15:00:00'
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


Language.hasMany(Offer);
Offer.belongsTo(Language);

module.exports = Offer;