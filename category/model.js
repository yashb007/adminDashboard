
const Sequelize = require('../services/sequelize.service').connection();
const sequelize = require('sequelize');
const Language = require('../Language/model')
const Media = require('../media/model')
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
    },
    ParentId:{
        type: sequelize.STRING,
        defaultValue:"0"    
    }

}, {
    indexes: [{unique: true, fields: ['name']}]
});



Category.belongsTo(Language, { constraints: true, onDelete: 'CASCADE', through :'LanguageId', foreignKey: 'LanguageId' });
Language.hasMany(Category);

Category.hasMany(Category);
Category.belongsTo(Category, { as: 'parent',  foreignKey: 'ParentId' });


Media.hasMany(Category);
Category.belongsTo(Media);

module.exports = Category;