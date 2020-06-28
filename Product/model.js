
const Sequelize = require('../../services/sequelize.service').connection();
const sequelize = require('sequelize');

const Product = Sequelize.define('Product', {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    description:{
        type: sequelize.STRING,
        allowNull: false
    },
    Price:{
        type: sequelize.INTEGER,
        allowNull: false
    },
    Status:{
        type:sequelize.BOOLEAN,
        defaultValue:false
    }

}, {
    indexes: [{unique: true, fields: ['name']}]
});



module.exports = Product;
