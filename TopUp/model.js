const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Language = require('../Language/model')
const Media = require('../media/model')
const TopUp = Sequelize.define('TopUp',
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
        Price:{
            type: sequelize.INTEGER ,
            allowNull: false
        },
        Status:{
            type:sequelize.BOOLEAN,
            defaultValue:false
        },
        Coins:{
            type:sequelize.INTEGER ,
            allowNull: false
        },

    },
    {
        indexes: [{unique: true, fields: ['Name']}]
    }
);


Language.hasMany(TopUp);
TopUp.belongsTo(Language);

Media.hasOne(TopUp);
TopUp.belongsTo(Media);


module.exports = TopUp;