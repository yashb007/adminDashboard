const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();

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
    },
    {
        indexes: [{unique: true, fields: ['Title']}]
    }
);

module.exports = Post;