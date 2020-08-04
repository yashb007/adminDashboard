const router = require('express').Router()
const OtherAdsController = require('./otherAds.controller')
const ActivityControllerMiddleware = require('../activity log/middleware/activityModel.js')

router.post('/addBulk', OtherAdsController.addAdsBulk)
router.post('/listAll', OtherAdsController.listAll)
router.post('/watchedAd', ActivityControllerMiddleware.registerTable, OtherAdsController.watchedAd)

module.exports = router
