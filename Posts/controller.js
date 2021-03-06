const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Post = require('./model');
const Config = require('../enviornment/index');



exports.getPostById = (req,res,next,id) => {
    try{
        Post.findOne({
            where :{
                id : id
            }
        }).then(post => {
            if(!post){
                return res.status(400).json({  
                    error : "No Post found in db"
                })
            }
            req.profile = post;
            
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
        Post.create({
          Title:_b.Title,
          Description:_b.Description,
          Price:_b.Price,
          StartingPrice:_b.StartingPrice,
          MaximumPrice:_b.MaximumPrice,
          completionTime:_b.completionTime,
          LanguageId:_b.LanguageId,
          MediumId:_b.MediumId,
          CategoryId:_b.CategoryId,
          BrandId:_b.BrandId,
          ProductId:_b.ProductId
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
        Post.update({
            Title:_b.Title,
            Description:_b.Description,
            Price:_b.Price,
            StartingPrice:_b.StartingPrice,
            MaximumPrice:_b.MaximumPrice,
            completionTime:_b.completionTime,
            LanguageId:_b.LanguageId,
            MediumId:_b.MediumId,
            CategoryId:_b.CategoryId,
            BrandId:_b.BrandId,
            ProductId:_b.ProductId
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
        Post.destroy({
            where: { Title:req.profile.Title}
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
    if (_b.PostId) opts.where.id = _b.PostId;
    if (_b.placeForBidding) opts.where.id = _b.placeForBidding;
    if (_b.isNew) opts.where.id = _b.isNew;
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword) opts.where.Title = {[sequelize.Op.like]: `%${_b.keyword}%`};

    Post.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'post not found'
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
        Post.update({
            Status: !req.profile.Status
        },{
            where:{
                Title:req.profile.Title
            }
        }).then(u => {
            res.status(200).json({status: true, data: u});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
    }

    exports.updateIsNew= (req,res) => {
        Post.update({
            isNew: !req.profile.isNew
        },{
            where:{
                Title:req.profile.Title
            }
        }).then(u => {
            res.status(200).json({status: true, data: u});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
    }