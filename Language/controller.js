const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Language = require('./model');
const Config = require('../enviornment/index');



exports.getLangById = (req,res,next,id) => {
    try{
        Language.findOne({
            where :{
                id : id
            }
        }).then(lang => {
            if(!lang){
                return res.status(400).json({  
                    error : "No language found in db"
                })
            }
            req.profile = lang;
            
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
        Language.create({
            Name: _b.Name,
            LanguageCode:_b.LanguageCode
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
        Language.update({
            Name: _b.Name,
            LanguageCode:_b.LanguageCode
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
        Language.destroy({
            where: {LanguageCode: req.profile.LanguageCode}
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

    Language.findAll(opts)
        .then(u => {
            if (!u) {
             return   res.status(400).json({
                    status: false,
                    message: 'Lang not found'
                });
            } 
                res.json({data:u,status:true})
            
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
    }    

    exports.updateStatus= (req,res) => {
        Language.update({
            Status: !req.profile.Status
        },{
            where:{
                LanguageCode: req.profile.LanguageCode
            }
        }).then(u => {
            res.status(200).json({status: true, data: u});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
    }
