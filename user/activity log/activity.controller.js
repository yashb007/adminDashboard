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