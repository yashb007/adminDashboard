const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Package = require('./model');
const Config = require('../enviornment/index');



exports.getPackageById = (req,res,next,id) => {
    try{
        Package.findOne({
            where :{
                id : id
            }
        }).then(pack => {
            if(!pack){
                return res.status(400).json({  
                    error : "No Package found in db"
                })
            }
            req.profile = pack;
            
            next();
        })
    }
    catch(err) {
        console.error(err);
        res.status(400).json({status: false});
    }
};

exports.add = (req, res) => {
    try {
        const _b = req.body;
        Package.create({
            Name: _b.Name,
            Price : _b.Price,
            Coins:_b.Coins,
            Duration:_b.Duration,
            Refferal:_b.Refferal
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

exports.edit = (req, res) => {
    try {
        const _b = req.body;
        Package.update({
            Name: _b.Name,
            Price:_b.Price,
            Coins:_b.Coins,
            Refferal:_b.Refferal,
            Duration:_b.Duration
        },{
            where : {
            id : req.profile.id
        }})
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

exports.delete = (req,res) => {
    const _b = req.body
    try {
        Package.destroy({
            where: {Name: req.profile.Name}
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
    if (_b.packageId) opts.where.id = _b.packageId;
    if (_b.LanguageId) opts.where.LanguageId = _b.LanguageId;
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword) opts.where.Name = {[sequelize.Op.like]: `%${_b.keyword}%`};

    Package.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'Package not found'
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

    exports.updateStatus= (req,res) => {
        Package.update({
            Status: !req.profile.Status
        },{
            where:{
                Name:req.profile.Name
            }
        }).then(u => {
            res.status(200).json({status: true, data: u});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
    }

    