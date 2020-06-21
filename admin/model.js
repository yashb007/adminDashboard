const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();

const Admin = Sequelize.define('Admin',
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
        userName: {
            type: sequelize.STRING
        },
        password: {
            type: sequelize.STRING,
            allowNull: false
        }
    },
    {
        indexes: [{unique: true, fields: ['email']}]
    }
);

module.exports = Admin;