const ActivityModelController = require('./middleware/activityModel')
const ActivityController = require('./activity.controller')
const router = require('express').Router()

// router.post('/activityTest', ActivityModelController.registerTable,(req, res) => {
//     console.log("Hi")
//     console.log(req.Models.UserActivityModel)
//     res.send("Testing")
// })

router.post('/fetchAllActivity', ActivityModelController.registerTable, ActivityController.fetchAllActivity)
router.post('/fetchOtherAds', ActivityModelController.registerTable, ActivityController.fetchOtherAds)
router.post('/seeder', ActivityModelController.registerTable, ActivityController.seedSomeActivityLog)
router.post('/adWatchedLog', ActivityModelController.registerTable, ActivityController.adWatchedActivityLog)
router.post('/walletTransaction', ActivityModelController.registerTable, ActivityController.walletTransaction)

module.exports = router