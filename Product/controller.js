const sequelize = require('sequelize');
const Product = require('./model');
const Config = require('../enviornment/index');



exports.getProductById = (req,res,next,id) => {
    try{
        Product.findOne({
            where :{
                id : id
            }
        }).then(product => {
            if(!product){
                return res.status(400).json({  
                    error : "No Product found in db"
                })
            }
            req.profile = product;
            
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
        Product.create({
          name:_b.name,
          description:_b.description,
          Price:_b.Price
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
        Product.update({
            name:_b.name,
            description:_b.description,
            Price:_b.Price
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
        Product.destroy({
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
    if (_b.languageId) opts.where.languageId = _b.languageId;
    if (_b.ProductId) opts.where.id = _b.ProductId;
    if (_b.BrandId) opts.where.BrandId = _b.BrandId;
    if (_b.categoryId) opts.where.categoryId = _b.categoryId;
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword) opts.where.name = {[sequelize.Op.like]: `%${_b.keyword}%`};

    Product.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'Product not found'
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
        Product.update({
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
