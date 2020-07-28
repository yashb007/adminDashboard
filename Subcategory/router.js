const router = require('express').Router();

const Controller = require('./controller');


router.param('subcategoryId', Controller.getSubCategoryById)

router.post('/add', Controller.add);
router.post('/delete/:subcategoryId', Controller.delete);
router.post('/edit/:subcategoryId', Controller.edit);
router.post('/status/:subcategoryId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
