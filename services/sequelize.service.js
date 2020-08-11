const dbConfig = require('../enviornment/index').db;
const SequelizeService = require("sequelize");

let sequelize;

module.exports = {
    connect: () => {
        return sequelize = new SequelizeService(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
            host: dbConfig.HOST,
            dialect: dbConfig.dialect,
            pool: {
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                acquire: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle
            },
            logging: console.log,
            define: {
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci'
            }
        });
    },
    auth : () => {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        return sequelize;
    },
    connection : () => {
        return sequelize;
    }
};