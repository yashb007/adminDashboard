const router = require('express').Router();

const Controller = require('./controller');


router.param('userId', Controller.getUserById)

router.post('/add', Controller.add);
router.post('/edit/:userid', Controller.edit);
router.post('/delete/:userId', Controller.delete);
router.post('/status/:userId', Controller.updateStatus);
router.get('/get',  Controller.get);

module.exports = router;
