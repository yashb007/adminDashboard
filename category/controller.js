const sequelize = require('sequelize');
const Category = require('./model');
const Config = require('../enviornment/index');



exports.getCategoryById = (req,res,next,id) => {
    try{
        Category.findOne({
            where :{
                id : id
            }
        }).then(category => {
            if(!category){
                return res.status(400).json({  
                    error : "No Category found in db"
                })
            }
            req.profile = category;
            
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
        Category.create({
          name:_b.name
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
        Category.update({
          name:_b.name
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
        Category.destroy({
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

    Category.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'Category not found'
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
        Category.update({
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
