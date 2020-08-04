const router = require('express').Router()
const { postParentTopUp } = require('./referrals.controller')

router.post('/postParentTopUp', postParentTopUp)

module.exports = router