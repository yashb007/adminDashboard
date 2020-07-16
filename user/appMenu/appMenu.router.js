const router = require('express').Router()
const AppMenuController = require('./appMenu.controller')
const multer = require('../../services/multer.services')
const LanguageController = require('../../Language/middleware/selectLanguage').selectLanguageById

router.post('/add', multer.array('menu'), AppMenuController.addMenu)
router.post('/removeMenu', AppMenuController.deleteMenu)
router.post('/updateMenu', AppMenuController.updateMenu)
router.post('/fetchMenu', LanguageController, AppMenuController.fetchMenus)

module.exports = router