const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const Address = require('./model');
const Config = require('../enviornment/index');



exports.getAddressById = (req,res,next,id) => {
    try{
        Address.findOne({
            where :{
                id : id
            }
        }).then(address => {
            if(!address){
                return res.status(400).json({  
                    error : "No Address found in db"
                })
            }
            req.profile = address;
            
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
        Address.create({
            AddressTitle: _b.AddressTitle,
            Block : _b.Block,
            Street : _b.Street,
            Avenue : _b.Avenue,
            HouseNo : _b.HouseNo,
            FloorNo : _b.FloorNo ,
            FlatNo : _b.FlatNo,
            Lattitude : _b.Lattitude,
            Longitude : _b.Longitude,
            Governerate :_b.Governerate,
            Area: _b.Area
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
        Address.update({
            AddressTitle: _b.AddressTitle,
            Block : _b.Block,
            Street : _b.Street,
            Avenue : _b.Avenue,
            HouseNo : _b.HouseNo,
            FloorNo : _b.FloorNo ,
            FlatNo : _b.FlatNo,
            Lattitude : _b.Lattitude,
            Longitude : _b.Longitude,
            Governerate :_b.Governerate,
            Area: _b.Area
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
        Address.destroy({
            where: {AddressTitle: req.profile.AddressTitle}
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
    if (_b.keyword) opts.where.AddressTitle = {[sequelize.Op.like]: `%${_b.keyword}%`};

    Address.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'Address not found'
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
        Address.update({
            Status: !req.profile.Status
        },{
            where:{
                AddressTitle: req.profile.AddressTitle
            }
        }).then(u => {
            res.status(200).json({status: true, data: u});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
    }

    