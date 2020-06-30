const router = require('express').Router();
const controller = require('./media.controller');
const multer = require('../services/multer.service');

router.post('/add', multer.array('media'), controller.add);
router.post('/update', multer.single('media'), controller.update);
router.post('/updateUrl', controller.updateUrl);
router.post('/delete', controller.delete);
router.get('/download/:id', controller.download);

//base
router.get('/', function (req, res) {
    res.status(200).send("media router works!")
});

module.exports = router;
