const router = require('express').Router();

const Controller = require('./controller');


router.param('langId', Controller.getLangById)

router.post('/add', Controller.add);
router.post('/edit/:langId', Controller.edit);
router.post('/delete/:langId', Controller.delete);
router.post('/status/:langId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
