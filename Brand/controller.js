const sequelize = require('sequelize');
const Brand = require('./model');
const Config = require('../enviornment/index');
const Media = require('../media/model')
const Language = require('../Language/model')


exports.getBrandById = (req,res,next,id) => {
    try{
        Brand.findOne({
            where :{
                id : id
            }
        }).then(brand => {
            if(!brand){
                return res.status(400).json({  
                    error : "No Brand found in db"
                })
            }
            req.profile = brand;
            
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
        Brand.create({
          name:_b.name,
          LanguageId:_b.LanguageId,
          MediumId:_b.MediumId
        })
        .then(u => {
                res.status(200).json({status: true});
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({status: false,error : err});
            });
    } catch (err) {
        console.error(err);
        res.status(400).json({status: false, error : err});
    }
};


exports.edit = (req, res) => {
    try {
        const _b = req.body;
        Brand.update({
          name:_b.name,
          LanguageId:_b.LanguageId,
          MediumId:_b.MediumId

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


exports.delete = (req,res) => {
    const _b = req.body
    try {
        Brand.destroy({
            where: {
                 name:req.profile.name
                }
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
    if (_b.keyword) opts.where.name = {[sequelize.Op.like]: `%${_b.keyword}%`};

    Brand.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'Brand not found'
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
        Brand.update({
            Status: !req.profile.Status
        },{
            where:{
                name:req.profile.name
            }
        }).then(u => {
            res.status(200).json({status: true, data: u});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
    }
