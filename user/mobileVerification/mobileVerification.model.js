const Sequelize = require('sequelize')
const connection = require('../../services/sequelize.service').connection()

const MobileVerification = connection.define('MobileVerification', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },

    mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: /^\d{10}$/
        }
    },

    otp: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    successfullyVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },

    msgId: {
        type: Sequelize.STRING
    }

})

module.exports = MobileVerification