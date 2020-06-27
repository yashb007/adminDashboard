module.exports = {
   
    db: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "admin@123",
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
    }
};
