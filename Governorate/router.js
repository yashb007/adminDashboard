const router = require('express').Router();

const Controller = require('./controller');


router.param('governId', Controller.getGovernById)

router.post('/add', Controller.add);
router.post('/delete/:governId', Controller.delete);
router.post('/edit/:governId', Controller.edit);
router.post('/status/:governId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
