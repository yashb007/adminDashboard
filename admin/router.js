const router = require('express').Router();
const passport = require('passport');

const Controller = require('./controller');

const AdminGuard = passport.authenticate('admin', {session: false});

router.param('adminId', Controller.getAdminById)

router.post('/login', Controller.login);
router.post('/changePassword/:adminId',AdminGuard,  Controller.changePassword);
router.post('/seeder', Controller.seeder);
router.post('/add',AdminGuard, Controller.add);
router.post('/delete/:adminId', AdminGuard, Controller.delete);
router.get('/get',AdminGuard,AdminGuard,  Controller.get);
router.post('/update/:adminId',AdminGuard,  Controller.update);


module.exports = router;
