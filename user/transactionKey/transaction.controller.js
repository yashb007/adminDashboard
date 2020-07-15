const TransactionKey = require('./transaction.model')
const User = require('../model').model
const Sequelize = require('sequelize')

exports.setKey = (req, res) => {
    const _b = req.body
    const userId = _b.userId

    TransactionKey.create({
        firstDigit: _b.firstDigit,
        secondDigit: _b.secondDigit,
        thirdDigit: _b.thirdDigit,
        fourthDigit: _b.fourthDigit,
        user: userId
    })
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send(error)
        })
}

exports.updateKey = (req, res) => {
    const _b = req.body
    const userId = _b.userId
    TransactionKey.findOne({
        where: {
            user: userId
        }
    })
        .then(data => {
            if (data == null) throw new Error("Not found")
            data.update({
                firstDigit: _b.firstDigit,
                secondDigit: _b.secondDigit,
                thirdDigit: _b.thirdDigit,
                fourthDigit: _b.fourthDigit,
            })
            .then(val => {
                res.send(val)
            })
            .catch(err => res.send(err))
        })
        .catch(error => {
            console.log(error)
            res.send(error.message)
        })
}

exports.matchKey = (req, res) => {
    const _b = req.body

    const userId = _b.userId

    TransactionKey.findOne({
        where: {
            user: userId
        },
        include: [
            User
        ]
        
    })
    .then(values => {
        const json = values.toJSON()
        if (json.firstDigit === _b.firstDigit &&
            json.secondDigit === _b.secondDigit &&
            json.thirdDigit === _b.thirdDigit &&
            json.fourthDigit === _b.fourthDigit)
        res.send({
            ...json,
            status: true
        })
        else {
            res.send({
                status: false,
                error: "PIN not matched"
            })
        }
    })
    .catch(err => res.send(err.message))

}