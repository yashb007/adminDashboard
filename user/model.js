const sequelize = require('sequelize');
const Sequelize = require('../services/sequelize.service').connection();
const bcrypt = require('bcrypt')

const Media = require('../media/model')

const options = {
    id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    Name: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    DOB: {
        type: sequelize.STRING,
        allowNull: false
    },
    PhoneNo: {
        type: sequelize.STRING,

    },
    TotalPost: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    TotalBiding: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    Status: {
        type: sequelize.BOOLEAN,
        defaultValue: false
    },
    wallet: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },

    rating: {
        type: sequelize.INTEGER,
        defaultValue: 0
    },
    parentId: {
        type: sequelize.UUID,
        allowNull: true,
    },
    username: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    balance: {
        type: sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    expireOn: {
        type: sequelize.INTEGER,
        allowNull: true,
    },
    quota: {
        type: sequelize.INTEGER,
    },
    referralId: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,

    },
    sellerId: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,

    },


}

const hooks = {
    indexes: [{ unique: true, fields: ['email'] }],

    beforeCreate: (record, options) => {
        record.dataValues.password = bcrypt.hashSync(record.dataValues.password, 0)
        // const Media = require('../media/model')
        // const User = Sequelize.define('User',
        //     {
        //         id: {
        //             type: sequelize.UUID,
        //             defaultValue: sequelize.UUIDV4,
        //             primaryKey: true
        //         },
        //         email: {
        //             type: sequelize.STRING,
        //             allowNull: false
        //         },
        //         Name: {
        //             type: sequelize.STRING,
        //             allowNull: false
        //         },
        //         password: {
        //             type: sequelize.STRING,
        //             allowNull: false
        //         },
        //         DOB: {
        //             type: sequelize.STRING,
        //             allowNull: false
        //         },
        //         PhoneNo: {
        //             type: sequelize.STRING,

        //         },
        //         TotalPost: {
        //             type: sequelize.INTEGER,
        //             defaultValue: 0
        //         },
        //         TotalBiding: {
        //             type: sequelize.INTEGER,
        //             defaultValue: 0
        //         },
        //         Status: {
        //             type: sequelize.BOOLEAN,
        //             defaultValue: false
        //         },
        //         wallet: {
        //             type: sequelize.INTEGER,
        //             defaultValue: 0
        //         },

        //     },
        //     {
        //         indexes: [{ unique: true, fields: ['email'] }]
        //     }
        // }
    }
}

const User = Sequelize.define('User',
    options,
    hooks
);
oTm(Media, User, 'MediaId')

function oTm(A, B, as) {
    A.hasMany(B, { as: as });
    B.belongsTo(A, { as: as });
}


// module.exports = User;


// function oTm(A, B) {
//     A.hasMany(B);
//     B.belongsTo(A);
// }

// function oTm(A, B, as) {
//     A.hasMany(B, { as: as });
//     B.belongsTo(A, { as: as });
// }

// function oTm(A, B, fk, as) {
//     A.hasMany(B, { foreignKey: fk, as: as });
//     B.belongsTo(A, { foreignKey: fk, as: as });
// }

// function mTm(A, B, through) {
//     A.belongsToMany(B, { through: through });
//     B.belongsToMany(A, { through: through });
// }

// function mTm(A, B, through, as) {
//     A.belongsToMany(B, { through: through, as: as });
//     B.belongsToMany(A, { through: through, as: as });
// }


// exports.model = User
// exports.options = options
// exports.hooks = hooks

module.exports = User

