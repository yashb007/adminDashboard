const router = require('express').Router()
const BannerController = require('./banner.controller')
const multer = require('../../services/multer.services')
const LanguageController = require('../../Language/middleware/selectLanguage').selectLanguageById

router.post('/add', multer.array('banners'), BannerController.addBanner)
router.post('/findBanners', LanguageController, BannerController.findBanners)
router.post('/removeBanner', BannerController.removeBanner)
router.post('/updateBanner', BannerController.updateBanner)

module.exports = router