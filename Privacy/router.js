
const router = require('express').Router();

const Controller = require('./controller');



router.post('/save', Controller.save);
router.post('/get',  Controller.get);

module.exports = router;




