const router = require('express').Router()
const { getDataOrSeed, listAllDefaultValues, getParticularValue } = require('./staticValues.controller')

router.post('/getDataOrSeed', getDataOrSeed)
router.post('/listAllStaticValues', listAllDefaultValues)
router.post('/getParticularValue', getParticularValue)

module.exports = router