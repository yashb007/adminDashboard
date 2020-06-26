const router = require('express').Router();

const Controller = require('./controller');


router.param('topUpId', Controller.getTopUpById)

router.post('/add', Controller.add);
router.post('/delete/:topUpId', Controller.delete);

router.post('/status/:topUpId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
