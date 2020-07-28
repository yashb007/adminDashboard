
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


// Language.hasMany(Category);
// Category.belongsTo(Language);

// Category.hasMany(Category);
// Category.belongsToMany(Category, {as: 'parent', through: 'ParentId'});


// Media.hasMany(Category, {foreignKey: 'MediaId'});
// Category.belongsTo(Media, {foreignKey: 'MediaId'});

// module.exports = Category;

Category.belongsTo(Language, { constraints: true, onDelete: 'CASCADE' });
Language.hasMany(Category);

Category.hasMany(Category);
Category.belongsToMany(Category, { as: 'parent', through:'ParentId', foreignKey: 'ParentId' });


Media.hasMany(Category);
Category.belongsToMany(Media, { foreignKey: 'MediaId', through : 'MediaId' });

module.exports = Category;