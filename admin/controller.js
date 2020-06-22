const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Auth = require('../services/auth.services')
const Admin = require('./model');
const Config = require('../enviornment/index');
exports.login = (req, res) => {
    try {
        const _b = req.body;
     
        Admin.findOne({
            where: {
                email: _b.email
            }
        })
            .then(u => {
                if (u) {
                    if (!bcrypt.compareSync(_b.password, u.password)) {
                        res.status(401).json({
                            status: false,
                            message: "Wrong password",
                            _b
                        });
                    } else {
                       const auth = Auth.encode(u.id);
                       const token = Auth.decode(auth)
                        res.status(200).json({
                            data: u,
                            auth: auth,
                            token,
                            _b,
                            status: true,
                           
                        });
                    }
                } else {
                    res.status(400).json({
                        status: false,
                        message: "email not found"
                    });
                }
            })
            .catch(e => {
                console.error(e);
                res.status(400).json({
                    status: false,
                    message: "internal error"
                });
            });
    } catch (err) {
        console.error(err);
        res.status(400).json({status: false});
    }
};

exports.seeder = function (req, res) {
    (async () => {
        const r = await Admin.findAndCountAll({});
        if (r.count === 0) {
            await Admin.create({
                email: Config.admin.email,
                password: bcrypt.hashSync(Config.admin.password, 0),
                userName: Config.admin.userName
            });
            return true;
        } else {
            return false;
        }
    })()
        .then(u => {
            if (!u) throw new Error();
            res.status(200).json({status: true});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
}

