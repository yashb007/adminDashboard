const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const bcrypt = require('bcrypt')

const options = {
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
    DOB: {
        type: sequelize.STRING,
        allowNull: false
    },
    PhoneNo: {
        type: sequelize.STRING,

    },
    TotalPost: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    TotalBiding: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    Status: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
    wallet: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },

    rating: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    parentId: {
        type: sequelize.UUID,
        allowNull: true,
    },
    username: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    balance: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    expireOn: {
        type: sequelize.INTEGER,
        allowNull: true,
    },
    quota: {
        type: sequelize.INTEGER,
    },
    referralId: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,

    },
    sellerId: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,

    },


}

const hooks = {
    indexes: [{ unique: true, fields: ['email'] }],

    beforeCreate: (record, options) => {
        record.dataValues.password = bcrypt.hashSync(record.dataValues.password, 0)
    }
}
const User = Sequelize.define('User',
    options,
    hooks
);

exports.model = User
exports.options = options
exports.hooks = hooks