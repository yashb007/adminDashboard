const router = require('express').Router();

const Controller = require('./controller');

const TransactionRouter = require('./transactionKey/transaction.router')
const videoAdsRouter = require('./Video Ads/videoAds.router')
const StaticDataRouter = require('./StaticValues/staticValues.router')
const otherAdsController = require('./otherAds/otherAds.router')
const ReferralsController = require('./referrals/referrals.router')
const ActivityRouter = require('./activity log/activity.router')
const BannerRouter = require('./banner/banner.router')
const AppMenuRouter = require('./appMenu/appMenu.router')


router.param('userId', Controller.getUserById)

router.post('/add', Controller.add);
router.post('/edit/:userid', Controller.edit);
router.post('/delete/:userId', Controller.delete);
router.post('/status/:userId', Controller.updateStatus);
router.post('/get',  Controller.get);
router.post('/getWallet/:userId',  Controller.getWallet);



// Transaction Key
router.use('/transactionKey', TransactionRouter)

// Video Ads 
router.use('/videoAds', videoAdsRouter)

// Static Data
router.use('/staticData', StaticDataRouter)

// Other Ads
router.use('/otherAds', otherAdsController)

// referrals
router.use('/referrals', ReferralsController)

// Activity 
router.use('/activity', ActivityRouter)

// Banner
router.use('/Banner', BannerRouter)

// AppMenu
router.use('/AppMenu', AppMenuRouter)

module.exports = router;
