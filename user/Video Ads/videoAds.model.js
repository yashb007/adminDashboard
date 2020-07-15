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
    },


    validDate: {
        type: sequelize.DATEONLY,
        defaultValue: sequelize.NOW
    },

}

const User = Sequelize.define('VideoAds',
    options,
);

exports.model = User
exports.options = options