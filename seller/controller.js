const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Seller = require('./model');
const Config = require('../enviornment/index');



exports.getSellerById = (req,res,next,id) => {
    User.findOne({
        where :{
            id : id
        }
    }).then((err,seller) => {
        if(err || !seller){
            return res.status(400).json({
                error : "No seller  found in db"
            })
        }
        req.profile = seller;
        
        next();
    })
}

exports.add = (req, res) => {
    try {
        const _b = req.body;
        Seller.create({
            email: _b.email,
            Name: _b.Name,
            DOB : _b.DOB,
            PhoneNo:_b.PhoneNo,
            password: bcrypt.hashSync(_b.password, 0)
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

exports.delete = (req, res) => {
    const _b = req.body
    try {
        User.destroy({
            where: {email: req.profile.email}
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
            res.status(400).json({status: false});
        });
    }    