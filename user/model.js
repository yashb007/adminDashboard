const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Media = require('../media/model')
const User = Sequelize.define('User',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        email: {
            type: sequelize.STRING,
            allowNull: false
        },
        Name: {
            type: sequelize.STRING,
            allowNull: false
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        },
        DOB:{
            type: sequelize.STRING,
            allowNull: false
        },
        PhoneNo:{
            type: sequelize.STRING,
           
        },
        TotalPost:{
            type: sequelize.INTEGER ,
            defaultValue:0
        },
        TotalBiding:{
            type: sequelize.INTEGER ,
            defaultValue:0 
        },
        Status:{
            type:sequelize.BOOLEAN,
            defaultValue:false
        },
        wallet:{
            type:sequelize.INTEGER ,
            defaultValue:0
        },

    },
    {
        indexes: [{unique: true, fields: ['email']}]
    }
);
oTm(Media, User, 'MediaId')

module.exports = User;


function oTm(A, B) {
    A.hasMany(B);
    B.belongsTo(A);
}

function oTm(A, B, as) {
    A.hasMany(B, {as: as});
    B.belongsTo(A, {as: as});
}

function oTm(A, B, fk, as) {
    A.hasMany(B, {foreignKey: fk, as: as});
    B.belongsTo(A, {foreignKey: fk, as: as});
}

function mTm(A, B, through) {
    A.belongsToMany(B, {through: through});
    B.belongsToMany(A, {through: through});
}

function mTm(A, B, through, as) {
    A.belongsToMany(B, {through: through, as: as});
    B.belongsToMany(A, {through: through, as: as});
}