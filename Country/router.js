const router = require('express').Router();

const Controller = require('./controller');


router.param('countryId', Controller.getCountryById)

router.post('/add', Controller.add);
router.post('/delete/:countryId', Controller.delete);
router.post('/edit/:countryId', Controller.edit);
router.post('/status/:countryId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
