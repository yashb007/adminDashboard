const OtherAds = require('./otherAds.model').model
const { findParticularValue } = require('../StaticValues/staticValues.controller')
const User = require('../model')

exports.addAdsBulk = (req, res) => {
    const _b = req.body
    let values = []

    for (let x of _b) {
        values.push(x)
    }

    OtherAds.bulkCreate(
        values
    )
        .then(data => {
            res.send(data)

        })
        .catch(err => {
            console.log(err)
            res.send(err)
        })
}

exports.listAll = (req, res) => {
    const _b = req.body

    OtherAds.findAll({})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}

exports.watchedAd = (req, res) => {
    const _b = req.body
    const userId = _b.userId

    const adFormat = _b.format

    OtherAds.findOne({
        where: {
            id: _b.adId,
        }
    })
        .then(async out => {
            if (out == null) throw new Error("Ad not listed")

            let response = await findParticularValue(`other${adFormat}AdCoins`)
            if (!response.status) throw new Error("Coins value not set or can't be fetched. Failed!")

            req.Models.UserActivityModel.findOrCreate({
                where: {
                    id: _b.adId
                },
                defaults: {
                    message: "Credited to watch Other Ad",
                    milestone: "1/1",
                    coinsEarned: parseInt(response.data.value),
                    category: `other${adFormat}AdWatchedAndEarnedCoin`,
                    targetId: _b.adId,
                }
            })
                .then(data => {
                    const status = data[1]

                    if (status) {
                        User.findOne({
                            where: {
                                id: userId,
                            }
                        })
                            .then(thisUser => {
                                let balance = thisUser.balance
                                thisUser.update({
                                    balance: parseInt(response.data.value) + balance
                                })
                                    .then(success => {
                                        res.send({
                                            message: "Success",
                                            data: success
                                        })
                                    })
                                    .catch(err => {
                                        console.log(userId)
                                        res.send({
                                            message: "Failed to update wallet balance.",
                                            error: err
                                        })
                                    })
                            })
                            .catch(err => {
                                res.send({
                                    message: "Can't fetch this user",
                                    error: err
                                })
                            })
                    } else {
                        res.send({
                            message: "Rewards for this ad is already credited.",
                            data
                        })
                    }
                })
                .catch(err => {
                    res.send({
                        message: "Can't either fetch or feed in your timeline.",
                        error: err,
                    })
                })
        })
        .catch(err => res.send({
            error: err.message
        }))
}