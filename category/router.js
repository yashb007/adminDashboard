const router = require('express').Router();

const Controller = require('./controller');


router.param('categoryId', Controller.getCategoryById)

router.post('/add', Controller.add);
router.post('/delete/:categoryId', Controller.delete);
router.post('/edit/:categoryId', Controller.edit);
router.post('/status/:categoryId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
