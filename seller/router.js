const router = require('express').Router();

const Controller = require('./controller');


router.param('sellerId', Controller.getSellerById)

router.post('/add', Controller.add);
router.post('/delete/:sellerId', Controller.delete);
router.get('/get',  Controller.get);

module.exports = router;