const router = require('express').Router();

const Controller = require('./controller');


router.param('areaId', Controller.getAreaById)

router.post('/add', Controller.add);
router.post('/delete/:areaId', Controller.delete);
router.post('/edit/:areaId', Controller.edit);
router.post('/status/:areaId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
