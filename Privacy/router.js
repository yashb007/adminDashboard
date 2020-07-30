
const router = require('express').Router();

const Controller = require('./controller');



router.post('/save', Controller.save);
router.get('/get',  Controller.get);

module.exports = router;




