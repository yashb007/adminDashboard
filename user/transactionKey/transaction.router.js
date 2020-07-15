const router = require('express').Router()
const transactionController = require('./transaction.controller')

router.post('/setKey', transactionController.setKey)
router.post('/updateKey', transactionController.updateKey)
router.post('/matchKey', transactionController.matchKey)

module.exports = router