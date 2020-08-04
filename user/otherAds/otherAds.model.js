const sequelize = require('sequelize');
const Sequelize = require('../../services/sequelize.service').connection();

const options = {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    url: {
        type: sequelize.STRING,
        defaultValue: "www.google.com",
        allowNull: false
    },

    validDate: {
        type: sequelize.DATEONLY,
        defaultValue: sequelize.NOW,
        allowNull: false
    },

    format :{
        type: sequelize.STRING,
        defaultValue: "image",
        allowNull: false
    },

}

const OtherAds = Sequelize.define('OtherAds',
    options,
);

exports.model = OtherAds
exports.options = options