const Sequelize = require('sequelize')

exports.fetchDashBoard = async (req, res) => {
    // Variables and functions

    const nowMonth = (new Date(Date.now())).getMonth()

    let date = new Date().toISOString().slice(0, 10)
    let timeStart = (new Date(date).getTime()) / 1000

    const _b = req.body
    const yearStart = _b.yearReport.start
    const yearEnd = _b.yearReport.end

    const yearTimeStamp = {
        start: (new Date(yearStart).getTime()) / 1000,
        end: (new Date(yearEnd).getTime()) / 1000
    }

    let dashboardElements = {}
    dashboardElements.Reports = {}

    //  Year report 
    let months = []
    let sumOfRecordsInMonth = {}
    let countOfRecordsInMonth = {}

    let avgOfRecordsInMonth = {}

    function recordHelper(recordMonth) {
        months.push(recordMonth)
        sumOfRecordsInMonth[recordMonth] = 0
        countOfRecordsInMonth[recordMonth] = 0
    }

    function calculateInRange(record, month) {
        ++countOfRecordsInMonth[month]
        sumOfRecordsInMonth[month] += record.coinsEarned
    }

    function avgInRange() {
        for (let i of months) {
            avgOfRecordsInMonth[i] = sumOfRecordsInMonth[i] / countOfRecordsInMonth[i]
        }

        // Pushing into Reports
        dashboardElements.Reports["year"] = {}
        dashboardElements.Reports["year"]["avgOfMonths"] = avgOfRecordsInMonth
        dashboardElements.Reports["year"]["sumOfMonths"] = sumOfRecordsInMonth
    }

    // Month Report
    let days = []
    let sumOfRecordsPerDay = {}
    let countOfRecordsPerDay = {}
    let avgOfRecordPerDay = {}

    function dailyReportCalculator(date, record) {
        if (!days.includes(date)) {
            days.push(date)
            sumOfRecordsPerDay[date] = 0
            countOfRecordsPerDay[date] = 0
        }

        if (record.coinsEarned > 0) {
            sumOfRecordsPerDay[date] += record.coinsEarned
            ++countOfRecordsPerDay[date]
        }
    }

    function dailyReportAverage() {
        for (let i of days) {
            avgOfRecordPerDay[i] = sumOfRecordsPerDay[i] / countOfRecordsPerDay[i]
        }

        // Pushing into Reports
        dashboardElements.Reports["thisMonth"] = {}
        dashboardElements.Reports["thisMonth"]["avgOfDays"] = avgOfRecordPerDay
        dashboardElements.Reports["thisMonth"]["sumOfDays"] = sumOfRecordsPerDay
    }

    // Database Queries

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
            dashboardElements.todaysAvgEarning = earning === 0 ? 0 : earning / count
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




    await req.Models.UserActivityModel.findAll({
        where: {
            time: {
                [Sequelize.Op.between]: [yearTimeStamp.start, yearTimeStamp.end]
            }
        }
    })
        .then(recordsSnap => {
            for (let x of recordsSnap) {

                const data = x.toJSON()

                const recordMonth = (new Date(data.time * 1000)).getMonth()

                if (recordMonth === nowMonth) {
                    let dateOfNowMonth = (new Date(data.time * 1000)).getDate()
                    dailyReportCalculator(dateOfNowMonth, data)
                }

                if (!months.includes(recordMonth)) recordHelper(recordMonth)

                if (data.coinsEarned > 0) calculateInRange(data, recordMonth)
            }


            avgInRange()
            dailyReportAverage()
            dashboardElements.Reports["status"] = true
        })
        .catch(err => {
            dashboardElements.Reports["status"] = false
            dashboardElements.Reports["error"] = err.message
        })


    // Response
    res.send(dashboardElements)
}