const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const TopUp = require('./model');
const Config = require('../enviornment/index');



exports.getTopUpById = (req, res, next, id) => {
    try {
        TopUp.findOne({
            where: {
                id: id
            }
        }).then(top => {
            if (!top) {
                return res.status(400).json({
                    error: "No topup found in db"
                })
            }
            req.profile = top;

            next();
        })
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ status: false });
    }
};

exports.add = (req, res) => {
    try {
        const _b = req.body;
        TopUp.create({
            Name: _b.Name,
            Price: _b.Price,
            Coins: _b.Coins,
            languageId: _b.LanguageId,
            MediumId: _b.MediumId
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



exports.edit = (req, res) => {
    try {
        const _b = req.body;
        TopUp.update({
            Name: _b.Name,
            Price: _b.Price,
            Coins: _b.Coins,
            languageId: _b.LanguageId,
            MediumId: _b.MediumId

        }, {
            where: {
                id: req.profile.id
            }
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

exports.delete = (req, res) => {
    const _b = req.body
    try {
        TopUp.destroy({
            where: { Name: req.profile.Name }
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
    const opts = { where: {}, attributes: {} };
    if (_b.topUpId) opts.where.id = _b.topUpId;
    if (_b.LanguageId) opts.where.LanguageId = _b.LanguageId;
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword) opts.where.Name = { [sequelize.Op.like]: `%${_b.keyword}%` };

    TopUp.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'TopUp not found'
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
    TopUp.update({
        Status: !req.profile.Status
    }, {
        where: {
            Name: req.profile.Name
        }
    }).then(u => {
        res.status(200).json({ status: true, data: u });
    })
        .catch(err => {
            console.error(err);
            res.status(400).json({ status: false });
        });
}

