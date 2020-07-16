const Sequelize = require('sequelize')

exports.fetchDashBoard = async (req, res) => {
    let date = new Date().toISOString().slice(0, 10)
    let timeStart = (new Date(date).getTime()) / 1000


    let dashboardElements = {}
    dashboardElements.Reports = {}
    await req.Models.UserActivityModel.findAll({
        where: {
            time: {
                [Sequelize.Op.gte]: timeStart
            }
        },
        order: [
            ['time', 'ASC']
        ]
    })
        .then(data => {
            let earning = 0
            let count = 0
            for (let i of data) {
                if (i.coinsEarned > 0) ++count
                earning += i.coinsEarned
            }

            dashboardElements.todaysEarning = earning
            dashboardElements.todaysAvgEarning = earning === 0 ? 0 : earning/count
        })
        .catch(err => dashboardElements.todaysEarning = err.message)

    await req.Models.UserActivityModel.findAll({
        where: {
            time: {
                [Sequelize.Op.gte]: timeStart
            },
            category: 'VideoAdWatched',
        },
        order: [
            ['milestone', 'DESC']
        ],
        limit: 1
    })
    .then(val => {
        if (val.length === 0)
            dashboardElements.dailyAdsTargetWatched = "0/8"
        else
            dashboardElements.dailyAdsTargetWatched = val[0].milestone
    })
    .catch(err => dashboardElements.dailyAdsTargetWatched = err.message)



    res.send(dashboardElements)
}