const router = require('express').Router();
const passport = require('passport');

const Controller = require('./controller');

const AdminGuard = passport.authenticate('admin', {session: false});

router.post('/login', Controller.login);
router.post('/changePassword',  Controller.changePassword);
router.post('/forgotPassword', Controller.forgotPassword);
router.post('/seeder', Controller.seeder);
router.post('/add',AdminGuard, Controller.add);
router.post('/delete',  Controller.delete);
router.get('/get',AdminGuard,  Controller.get);
router.post('/update',  Controller.update);


module.exports = router;
