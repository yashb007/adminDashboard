const router = require('express').Router();

const Controller = require('./controller');


router.param('addressId', Controller.getAddressById)

router.post('/add', Controller.add);
router.post('/delete/:addressId', Controller.delete);
router.post('/edit/:addressId', Controller.edit);
router.post('/status/:addressId', Controller.updateStatus);
router.post('/get',  Controller.get);

module.exports = router;
