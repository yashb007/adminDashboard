const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Language = require('../Language/model')
const Banner = Sequelize.define('Banner',
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


Language.hasMany(Banner);
Banner.belongsTo(Language);


module.exports = Banner;