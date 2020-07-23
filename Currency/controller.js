
const sequelize = require('sequelize');
const Currency = require('./model');



exports.getCurrencyById = (req,res,next,id) => {
    try{
        Currency.findOne({
            where :{
                id : id
            }
        }).then(currency => {
            if(!currency){
                return res.status(400).json({  
                    error : "No Currency found in db"
                })
            }
            req.profile = currency;
            
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
        Currency.create({
           Currency:_b.Currency,
           Coins:_b.Coins
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
        Currency.update({
            Currency:_b.Currency,
            Coins:_b.Coins
        },{
            where : {
            id : req.profile.id
        }})
            .then(u => {
                res.status(200).json({status: true});
            })
            .catch(err => {
                console.error(err);
                res.status(400).json({status: false,error : err});
            });
    } catch (err) {
        console.error(err);
        res.status(400).json({status: false,error : err});
    }
};

exports.delete = (req,res) => {
    const _b = req.body
    try {
        Currency.destroy({
            where: {id : req.profile.id}
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
        res.status(400).json({status: false,error : err});
    }
};

exports.get = (req,res) => {
    const _b = req.body;
    const opts = {where: {}, attributes: {}};
    if (+_b.offset) opts.offset = +_b.offset;
    if (+_b.limit) opts.limit = +_b.limit;
    if (_b.keyword) opts.where.Name = {[sequelize.Op.like]: `%${_b.keyword}%`};

    Currency.findAll(opts)
        .then(u => {
            if (!u) {
                res.status(400).json({
                    status: false,
                    message: 'Currency not found'
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


    