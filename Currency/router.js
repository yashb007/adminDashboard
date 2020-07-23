const router = require('express').Router();

const Controller = require('./controller');


router.param('currencyId', Controller.getCurrencyById)

router.post('/add', Controller.add);
router.post('/delete/:currencyId', Controller.delete);
router.post('/edit/:currencyId', Controller.edit);
router.get('/get',  Controller.get);

module.exports = router;
