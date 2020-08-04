const Sequelize = require('sequelize')
const connection = require('../../services/sequelize.service').connection()

const Banner = connection.define('UserBanner', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },

    bannerName_en: {
        type: Sequelize.STRING,
    },

    bannerName_ar: {
        type: Sequelize.STRING
    },

    url: {
        type: Sequelize.STRING,
    },

    mediaType: {
        type: Sequelize.STRING
    }

})

module.exports = Banner