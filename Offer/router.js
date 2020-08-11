const router = require('express').Router();

const Controller = require('./controller');


router.param('offerId', Controller.getOfferById)

router.post('/add', Controller.add);
router.post('/delete/:offerId', Controller.delete);
router.post('/edit/:offerId', Controller.edit);
router.post('/status/:offerId', Controller.updateStatus);
router.post('/get',  Controller.get);

module.exports = router;
