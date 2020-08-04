const sequelize = require('sequelize');
const Sequelize = require('../../services/sequelize.service').connection();

const options = {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },

    message: {
        type: sequelize.STRING, 
    },

    milestone: {
        type: sequelize.STRING,
    },

    coinsEarned: {
        type: sequelize.INTEGER
    },

    category: {
        type: sequelize.STRING
    },

    targetId: {
        type: sequelize.UUID
    }

    
}

const Activity = Sequelize.define('Activity',
    options,
);

exports.model = Activity
exports.options = options