
const Sequelize = require('../../services/sequelize.service').connection();
const sequelize = require('sequelize');

const Category = Sequelize.define('Category', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING
    },
    Status:{
        type:sequelize.BOOLEAN,
        defaultValue:false
    }

}, {
    indexes: [{unique: true, fields: ['name']}]
});



module.exports = Category;
