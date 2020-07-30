const router = require('express').Router();

const Controller = require('./controller');


router.param('sellerId', Controller.getSellerById)

router.post('/add', Controller.add);
router.post('/delete/:sellerId', Controller.delete);
router.post('/edit/:sellerId', Controller.delete);
router.post('/verify/:sellerId', Controller.updateVerify);
router.post('/status/:sellerId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
