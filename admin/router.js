const router = require('express').Router();
//const passport = require('passport');

const Controller = require('./controller');


router.post('/login', Controller.login);


module.exports = router;
