const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');
const User = require('./user.model');

var moment = require('moment');
const Message = connection.define('Message', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    targetUserId: { // target user
        type: Sequelize.UUID
    },
    text: {
        type: Sequelize.TEXT
    },
    seen: {
        type: Sequelize.BOOLEAN
    },
    createdAt: {
        type: Sequelize.BIGINT,
        allowNull: false,
        field: 'createdAt'
    }
},
    {
        tableName: 'messages',
        hooks: {
            beforeCreate: (record, options) => {
                record.dataValues.createdAt = moment().unix();
            }
        }
    });

module.exports = Message;
