const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Language = require('../Language/model')
const Privacy = Sequelize.define('Privacy',
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
Language.hasMany(Privacy);
Privacy.belongsTo(Language);

module.exports = Privacy;