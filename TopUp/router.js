const router = require('express').Router();

const Controller = require('./controller');


router.param('topUpId', Controller.getTopUpById)

router.post('/add', Controller.add);
router.post('/delete/:topUpId', Controller.delete);
router.post('/edit/:topUpId', Controller.edit);

router.post('/status/:topUpId', Controller.updateStatus);
router.post('/get',  Controller.get);

module.exports = router;
