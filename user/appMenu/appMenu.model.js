const Sequelize = require('sequelize')
const connection = require('../../services/sequelize.service').connection()

const AppMenu = connection.define('AppMenu', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },

    menuName_en: {
        type: Sequelize.STRING,
    },

    menuName_ar: {
        type: Sequelize.STRING
    },

    url: {
        type: Sequelize.STRING,
    },

    mediaType: {
        type: Sequelize.STRING
    },

    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    }
})

module.exports = AppMenu