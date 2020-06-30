const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');

//Sequelize ORM post design
const Media = connection.define('Media', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    url: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'media'
});

module.exports = Media;
