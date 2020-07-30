const Sequelize = require('sequelize')

exports.fetchAllActivity = (req, res) => {
    const _b = req.body
    const offset = _b.offset
    const limit = _b.limit
    req.Models.UserActivityModel.findAll({
        order: [
            ['createdAt', 'DESC'],
        ],
        offset: offset,
        limit: limit
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => res.send(err))
}

exports.fetchOtherAds = (req, res) => {
    const _b = req.body
    const offset = _b.offset
    const limit = _b.limit
    req.Models.UserActivityModel.findAll({
        where: {
            category: {
                [Sequelize.Op.like]: "other%"
            }
        },
        order: [
            ['createdAt', 'DESC'],
        ],
        offset: offset,
        limit: limit
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => res.send(err))
}

exports.seedSomeActivityLog = (req, res) => {
    const _b = req.body
    req.Models.UserActivityModel.create({
        message: _b.message,
        milestone: _b.milestone,
        coinsEarned: _b.coins,
        category: _b.category,
        targetId: _b.targetId,
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}


exports.adWatchedActivityLog = (req, res) => {
    const _b = req.body
    const startRange = _b.startRange
    const limit = _b.recordLimit

    let noOfVideoAds = 0
    let noOfOtherVideoAds = 0
    let noOfOtherImageAds = 0
    let totalEarning = 0
    let countOfRecords = 0
    let avgOfEarning

    const timestamps = {
        start: (new Date(startRange).getTime()) / 1000
    }

    req.Models.UserActivityModel.findAll({
        where: {
            time: {
                [Sequelize.Op.gte]: timestamps.start
            },
            category: {
                [Sequelize.Op.like]: '%AdWatched%'
            }

        },
        order: [
            ['time', 'DESC']
        ],
        limit: limit
    })
        .then(data => {
            calculateCount(data)
            res.send({
                status: true,
                noOfOtherImageAds,
                noOfOtherVideoAds,
                noOfVideoAds,
                totalEarning,
                countOfRecords,
                avgOfEarning,
                data
            })
        })
        .catch(err => {
            res.send({
                status: false,
                error: err.message
            })
        })


    function calculateCount(records) {
        for (let i of records) {
            const data = i.toJSON()

            if (data.coinsEarned > 0) {
                ++countOfRecords
                totalEarning += data.coinsEarned
            }

            if (/other/.test(data.category)) {
                if (/image/.test(data.category)) {
                    ++noOfOtherImageAds
                } else {
                    ++noOfOtherVideoAds
                }

            } else {
                ++noOfVideoAds
            }
        }

        if (countOfRecords !== 0)
            avgOfEarning = totalEarning / countOfRecords
        else avgOfEarning = 0
    }
}

exports.walletTransaction = (req, res) => {
    const _b = req.body

    req.Models.UserActivityModel.findAll({
        where: {
            coinsEarned: {
                [Sequelize.Op.ne]: 0
            }
        }
    })
    .then(data => {
        res.send({
            status: true,
            data
        })
    })
    .catch(err => {
        res.send({
            status: false,
            error: err.message
        })
    })
}