const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Language = require('../Language/model')
const Media = require('../media/model')
const Product = require('../Product/model')
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
        date: {
            type: sequelize.DATE
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




oTm(Language, Banner);
oTm(Media, Banner);


module.exports = Banner;

function oTm(A, B) {
    A.hasMany(B);
    B.belongsTo(A);
}
