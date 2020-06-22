const router = require('express').Router();
//const passport = require('passport');

const Controller = require('./controller');


router.post('/login', Controller.login);
router.post('/seeder', Controller.seeder);

module.exports = router;
