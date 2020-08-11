const router = require('express').Router();

const Controller = require('./controller');


router.param('postId', Controller.getPostById)

router.post('/add', Controller.add);
router.post('/delete/:postId', Controller.delete);
router.post('/edit/:postId', Controller.edit);
router.post('/status/:postId', Controller.updateStatus);
router.post('/isNew/:postId', Controller.updateIsNew);
router.post('/get',  Controller.get);

module.exports = router;
