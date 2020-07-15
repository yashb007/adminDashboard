const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Language =  require('../Language/model')
const Media  = require('../media/model')
const Brand = Sequelize.define('Brand',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: sequelize.STRING,
            allowNull: false
        }
    },
    {
        indexes: [{unique: true, fields: ['name']}]
    }
);



Language.hasMany(Brand);
Brand.belongsTo(Language);


Media.hasMany(Brand);
Brand.belongsTo(Media);


module.exports = Brand;


