const sequelize = require('sequelize');
const Sequelize = require('../../../services/sequelize.service').connection();

const ActivityModel = require('../activity.model')
const UserModel = require('../../model')

let models = {}

const defineAllModels = async (name) => {
    // Activity - User
    const UserActivityModel = await Sequelize.define('a_' + name, ActivityModel.options, { ...ActivityModel.hooks,freezeTableName: true })
    // await Sequelize.sync({alter: false, force: false})

    await UserModel.hasMany(UserActivityModel, {
        foreignKey: 'user',
    })
    await UserActivityModel.belongsTo(UserModel, {
        foreignKey: 'user'
    })

    await Sequelize.sync({alter: false, force: false})

    

    return {
        UserActivityModel,
    }
}

const registerTable = async (req, res, next) => {
    const _b = req.body
    console.log(models[_b.username])
    if (models[_b.username] == null) {
        const model = await defineAllModels(_b.username)

        models[_b.username] = model
        console.log(model)
    }

    req.Models = models[_b.username]
    next()
}

module.exports = {
    registerTable
}