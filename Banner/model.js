const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const Language = require('../Language/model')
const Media = require('../media/model')
const Product = require('../Product/model')
const Banner = Sequelize.define('Banner',
    {
        id: {
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        Name: {
            type: sequelize.STRING,
            allowNull: false
        },
        date: {
            type: sequelize.DATE
        },
        url: {
            type: sequelize.TEXT
        },
        Status:{
            type:sequelize.BOOLEAN,
            defaultValue:false
        }
       
    },
    {
        indexes: [{unique: true, fields: ['Name']}]
    }
);




oTm(Language, Banner);
oTm(Media, Banner);
oTm(Product, Banner);

module.exports = Banner;


function oTm(A, B) {
    A.hasMany(B);
    B.belongsTo(A);
}

function oTm(A, B, as) {
    A.hasMany(B, { as: as });
    B.belongsTo(A, { as: as });
}

function oTm(A, B, fk, as) {
    A.hasMany(B, { foreignKey: fk, as: as });
    B.belongsTo(A, { foreignKey: fk, as: as });
}

function mTm(A, B, through) {
    A.belongsToMany(B, { through: through });
    B.belongsToMany(A, { through: through });
}

function mTm(A, B, through, as) {
    A.belongsToMany(B, { through: through, as: as });
    B.belongsToMany(A, { through: through, as: as });
}

function mTm(A, B, through, as, unique) {
    A.belongsToMany(B, { through: { model: through, unique: false }, as: as });
    B.belongsToMany(A, { through: { model: through, unique: false }, as: as });
}
