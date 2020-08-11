
const router = require('express').Router();

const Controller = require('./controller');



router.param('brandId', Controller.getBrandById)

router.post('/add', Controller.add);
router.post('/delete/:brandId', Controller.delete);
router.post('/edit/:brandId', Controller.edit);
router.post('/status/:brandId', Controller.updateStatus);
router.post('/get',  Controller.get);

module.exports = router;




