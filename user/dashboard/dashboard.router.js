const DashBoardController = require('./dashboard.controller')
const ActivityLogMiddleWare = require('../activity log/middleware/activityModel').registerTable

const router = require('express').Router()

router.post('/show', ActivityLogMiddleWare, DashBoardController.fetchDashBoard)

module.exports = router