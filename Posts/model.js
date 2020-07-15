const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Media = require('../media/model')
const  Language = require('../Language/model')
const Category = require('../category/model') 

const Post = Sequelize.define('Post',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        Title: {
            type: sequelize.STRING,
            allowNull: false
        },
        Description: {
            type: sequelize.STRING,    
        },
        Price:{
            type: sequelize.INTEGER ,
            allowNull: false
        },
        StartingPrice:{
            type:sequelize.INTEGER,
            allowNull: false
        },
        Status:{
            type:sequelize.BOOLEAN,
            defaultValue:false
        },
        MaximumPrice:{
            type:sequelize.INTEGER ,
            allowNull: false
        },
        isNew:{
            type:sequelize.BOOLEAN,
            defaultValue:true
        },
        placeForBidding:{
            type:sequelize.BOOLEAN,
            defaultValue:true
        },
        completionTime:{
            type:sequelize.INTEGER,
            
        }

    },
    {
        indexes: [{unique: true, fields: ['Title']}]
    }
);

oTm(Language, Post);
oTm(Media, Post);
oTm(Category, Post);

module.exports = Post;


function oTm(A, B) {
    A.hasMany(B);
    B.belongsTo(A);
}