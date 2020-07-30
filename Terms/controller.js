const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Term = require('./model');
const Config = require('../enviornment/index');



exports.save = (req, res) => {
    try {
        const _b = req.body;
        Term.create({
            description:_b.description,
            LanguageId:_b.LanguageId
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

exports.get = (req,res) => {
    const _b = req.body;
    const opts = {where: {}, attributes: {}};
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword) opts.where.Name = {[sequelize.Op.like]: `%${_b.keyword}%`};

    Term.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'Term policy not found'
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
    }    

    