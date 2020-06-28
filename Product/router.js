const router = require('express').Router();

const Controller = require('./controller');


router.param('productId', Controller.getProductById)

router.post('/add', Controller.add);
router.post('/delete/:productId', Controller.delete);
router.post('/edit/:productId', Controller.edit);
router.post('/status/:productId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
