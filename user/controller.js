const sequelize = require('sequelize');
const User = require('./model');
const Config = require('../enviornment/index');

exports.getUserById = (req, res, next, id) => {
    try {
        User.findOne({
            where: {
                id: id
            },
            attributes: {
                include: [
                    ['name_en', 'name']
                ],
                exclude: [
                    'name_en'
                ]
            }
        }).then(user => {
            if (!user) {
                return res.status(400).json({
                    error: "No user  found in db"
                })
            }
            req.profile = user;

            next();
        })
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ status: false });
    }
};

exports.add = async (req, res) => {
    try {
        const _b = req.body;
        let creator = {
            email: _b.email,
            name_en: _b.name_en,
            name_ar: _b.name_ar,
            DOB: _b.DOB,
            PhoneNo: _b.PhoneNo,
            password: _b.password,
            username: _b.username,
            quota: _b.quota,
        }

        if (_b.parentId) {

            creator.parentId = await User.findOne({
                where: {
                    id: _b.parentId
                }
            })
                .then(v => {
                    if (v == null) {
                        throw new Error("Parent not found")
                    }

                    return _b.parentId
                })
        }

        User.create(creator)
            .then(u => {
                res.status(200).send({ ...u.toJSON(), status: true });
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({ error: err.message, status: false });
            });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message, status: false });
    }
};

exports.edit = (req, res) => {
    try {
        const _b = req.body;
        User.findOne({
            where: {
                id: req.params.userId
            }
        })
        .then(user => {
            user.update({
                email: _b.email,
                name_en: _b.name_en,
                name_ar: _b.name_ar,
                DOB: _b.DOB,
                PhoneNo: _b.PhoneNo,
                // password: bcrypt.hashSync(_b.password, 0)
                password: _b.password
            })
                .then(u => {
                    res.status(200).json({ status: true });
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).json({ status: false });
                });
        })
    } catch (err) {
        console.error(err);
        res.status(400).json({ status: false });
    }
};

exports.delete = (req, res) => {
    const _b = req.body
    try {
        User.destroy({
            where: { id: req.profile.id }
        })
            .then(u => {
                res.status(200).json({ status: true });
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({ status: false });
            });
    } catch (err) {
        console.error(err);
        res.status(400).json({ status: false });
    }
};

exports.get = (req, res) => {
    const _b = req.body;
    const langCode = req.LanguageCode

    const opts = { where: {}, attributes: { exclude: ['password', `name_en`, `name_ar`], include: [[`name_${langCode}`, 'name']] } };
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword) opts.where.username = { [sequelize.Op.like]: `%${_b.keyword}%` };

    User.findAll(opts)
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
            res.status(400).json({ status: false });
        });
}


exports.updateStatus = (req, res) => {
    User.update({
        Status: !req.profile.Status
    }, {
        where: {
            email: req.profile.email
        }
    }).then(u => {
        res.status(200).json({ status: true, data: u });
    })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
}