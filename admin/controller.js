const bcrypt = require('bcrypt');
//const sequelize = require('sequelize');

const Admin = require('./model');

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
                            message: "Wrong password"
                        });
                    } else {
                        const auth = Auth.encode(u.id);
                        res.status(200).json({
                            data: u,
                            auth: auth,
                            status: true
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
