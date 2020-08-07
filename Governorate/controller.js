const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Governorate = require('./model');
const Config = require('../enviornment/index');



exports.getGovernById = (req,res,next,id) => {
    try{
        Governorate.findOne({
            where :{
                id : id
            }
        }).then(governorate => {
            if(!governorate){
                return res.status(400).json({  
                    error : "No Governorate found in db"
                })
            }
            req.profile = governorate;
            
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
        Governorate.create({
            Name: _b.Name,
            CountryId:_b.CountryId,
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

exports.edit = (req, res) => {
    try {
        const _b = req.body;
        Governorate.update({
            Name: _b.Name,
            CountryId:_b.CountryId,
            LanguageId:_b.LanguageId
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
        Governorate.destroy({
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
    if (_b.GovernorateId) opts.where.GovernorateId = _b.GovernorateId;
    if (_b.CountryId) opts.where.CountryId = _b.CountryId;
    if (_b.LanguageId) opts.where.LanguageId = _b.LanguageId;
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword) opts.where.Name = {[sequelize.Op.like]: `%${_b.keyword}%`};

    Governorate.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'Governorate not found'
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
        Governorate.update({
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

    