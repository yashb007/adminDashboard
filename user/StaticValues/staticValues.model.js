const sequelize = require('sequelize');
const Sequelize = require('../../services/sequelize.service').connection();

const options = {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    category: {
        type: sequelize.STRING,
        allowNull: false
    },

    value: {
        type: sequelize.STRING,
        allowNull: false
    },

}

const User = Sequelize.define('StaticValues',
    options,
);

exports.model = User
exports.options = options