const router = require('express').Router();

const Controller = require('./controller');


router.param('packageId', Controller.getPackageById)

router.post('/add', Controller.add);
router.post('/delete/:packageId', Controller.delete);
router.post('/edit/:packageId', Controller.edit);
router.post('/status/:packageId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
