
const Sequelize = require('../services/sequelize.service').connection();
const sequelize = require('sequelize');
const Language = require('../Language/model')
const Media = require('../media/model')
const SubCategory = Sequelize.define('SubCategory', {
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
Category.belongsTo(Category, {as: 'parent', foreignKey: 'ParentCategoryId'});


Media.hasMany(Category, {foreignKey: 'MediaId'});
Category.belongsTo(Media, {foreignKey: 'MediaId'});

module.exports = Category;
