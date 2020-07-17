module.exports = {

    db: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "Admin@1234",
        // PASSWORD: "root",
        DB: "Admin_s",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    admin: {
        email: 'admin@admin.com',
        password: 'admin',
        userName: 'admin',
    },
    auth: {
        jwtSecret: 'secret',
    },
    base: {
        url: 'localhost:8029/'
    },
    msg91: {
        authkey: '249885A6FIqujm95eeb007eP1',
        sender: 'LIVLMS',
        route: '4',
        country: '91',
        api: 'https://api.msg91.com/api/v2/'
    },
};
