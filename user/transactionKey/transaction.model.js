const Sequelize = require('sequelize')
const sequelize = require('../../services/sequelize.service.js').connection()

const User = require('../model')

const options = {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    firstDigit: {
        type: Sequelize.CHAR(1),
        validate: {
            is: /^\d$/
        }
    },
    secondDigit: {
        type: Sequelize.CHAR(1),
        validate: {
            is: /^\d$/
        }
    },
    thirdDigit: {
        type: Sequelize.CHAR(1),
        validate: {
            is: /^\d$/
        }
    },
    fourthDigit: {
        type: Sequelize.CHAR(1),
        validate: {
            is: /^\d$/
        }
    },
}

const TransactionKey = sequelize.define('TransactionKey', options)

User.hasOne(TransactionKey, {
    onDelete: 'cascade',
    hooks: true,
    foreignKey: 'user'
})
TransactionKey.belongsTo(User, {
    foreignKey: 'user',
    // onDelete: 'CASCADE',
    // hooks: true,
})

module.exports = TransactionKey
