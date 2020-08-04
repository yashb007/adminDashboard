const router = require('express').Router()
const videoAdsController = require('./videoAds.controller')

router.post('/addBulk', videoAdsController.addAdsBulk)
router.post('/listAll', videoAdsController.listAll)

module.exports = router
