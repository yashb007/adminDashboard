const sequelize = require('sequelize');
const Sequelize = require('../../services/sequelize.service').connection();
const moment = require('moment')

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
    },

    time: {
        type: sequelize.INTEGER
    }

    
}

const hooks = {
    hooks: {
        beforeCreate: (record, options) => {
            console.log(moment().unix())
            console.log(moment.unix())
            record.dataValues.time = moment().unix()
        }
    }
}

const Activity = Sequelize.define('Activity',
    options,
    hooks
);

exports.model = Activity
exports.options = options
exports.hooks = hooks