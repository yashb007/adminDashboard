const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Language = require('../Language/model')
const Terms = Sequelize.define('Terms',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        description : {
            type : sequelize.STRING,
            allowNull: false
        }
       
    }
   
);
Language.hasMany(Terms);
Terms.belongsTo(Language);

module.exports = Terms;