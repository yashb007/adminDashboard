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

exports.add = (req, res) => {
    try {
        const _b = req.body;
        Admin.create({
            email: _b.email,
            userName: _b.userName,
            password: bcrypt.hashSync(_b.password, 0)
        })
            .then(u => {
                // mail the email and password
               // Mailer(_b);
                res.status(200).json({status: true});
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({status: false});
            });
    } catch (err) {
        console.error(err);
        res.status(400).json({status: false});
    }
};

exports.delete = (req, res) => {
    try {
        const _b = req.body;
        Admin.destroy({
            where: {email: _b.email}
        })
            .then(u => {
                res.status(200).json({status: true});
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({status: false});
            });
    } catch (err) {
        console.error(err);
        res.status(400).json({status: false});
    }
};

exports.get = (req, res) => {
    const _b = req.body;

    const opts = {where: {}, attributes: {exclude: ['password']}};
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword) opts.where.userName = {[sequelize.Op.like]: `%${_b.keyword}%`};

    Admin.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'user not found'
                });
            } else {
                res.status(200).json({
                    status: true,
                    data: u
                });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.update = (req, res) => {
    const _b = req.body;
    Admin.update({
        userName: _b.userName,
        image: _b.image
    }, {
        where: {
            id: req.user.id,
        }
    })
        .then(u => {
            res.status(200).json({status: true, data: u});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};

exports.changePassword = (req, res) => {
    const _b = req.body;
    if (typeof _b.password !== 'string') {
        res.status(400).json({
            status: false,
            message: 'Password must be a string'
        });
    } else {
        _b.password = bcrypt.hashSync(_b.password, 0);
        Admin.update({
            password: _b.password,
        }, {
            where: {
                id: req.user.id,
            }
        })
            .then(u => {
                res.status(200).json({status: true});
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({status: false});
            });
    }
};

exports.forgotPassword = (req, res) => {
    const _b = req.body;
    if (!_b.email || typeof _b.email !== 'string') {
        res.status(400).json({
            status: false,
            message: 'Email must be a string'
        });
    } else {
        Admin.findOne(
            {
                where: {
                    email: _b.email
                }
            }
        )
            .then(u => {
                if (!u) {
                    res.status(400).json({
                        status: false,
                        message: 'email not found'
                    });
                } else {
                    // send email with auth
                    // send the auth back to /changePassword to reset password
                //     const auth = Auth.encode(u.id);
                //     Mailer(auth);
                //     res.status(200).json({status: true});
                 res.json("Successfull route")    
            }
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({status: false});
            });
    }
};