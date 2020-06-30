
const Sequelize = require('../../services/sequelize.service').connection();
const sequelize = require('sequelize');
const Language = require('../Language/model')
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


Language.hasMany(Category);
Category.belongsTo(Language);

Category.hasMany(Category, {as: 'child', foreignKey: 'CategoryId'});
Category.belongsTo(Category, {as: 'parent', foreignKey: 'CategoryId'});

module.exports = Category;
