const router = require('express').Router();

const Controller = require('./controller');


router.param('bannerId', Controller.getBannerById)

router.post('/add', Controller.add);
router.post('/delete/:bannerId', Controller.delete);
router.post('/edit/:bannerId', Controller.edit);
router.post('/status/:bannerId', Controller.updateStatus);
router.post('/get',  Controller.get);

module.exports = router;
