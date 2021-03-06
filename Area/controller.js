const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Area = require('./model');
const Config = require('../enviornment/index');



exports.getAreaById = (req,res,next,id) => {
    try{
        Area.findOne({
            where :{
                id : id
            }
        }).then(area => {
            if(!area){
                return res.status(400).json({  
                    error : "No Area found in db"
                })
            }
            req.profile = area;
            
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
        Area.create({
            Name: _b.Name,
            PinCode:_b.PinCode,
            AreaCode:_b.AreaCode,
            LanguageId:_b.LanguageId,
            GovernorateId:_b.GovernorateId
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
        Area.update({
            Name: _b.Name,
            PinCode:_b.PinCode,
            AreaCode:_b.AreaCode,
            LanguageId:_b.LanguageId,
            GovernorateId:_b.GovernorateId
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
        Area.destroy({
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
    let opts = { where: {} };
    if (_b.AreaId) opts.where.id = _b.AreaId;
    if (_b.LanguageId) opts.where.LanguageId = _b.LanguageId;
    if (_b.GovernorateId) opts.where.GovernorateId = _b.GovernorateId;
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword) opts.where.Name = {[sequelize.Op.like]: `%${_b.keyword}%`};

    Area.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'Area not found'
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
        Area.update({
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

    