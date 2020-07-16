const router = require('express').Router()
const OTPController = require('./mobileVerification.controller')

router.post('/sendOTP', OTPController.sendOTP)
router.post('/resendOTP', OTPController.sendOTP)
router.post('/verifyOTP', OTPController.verifyOTP)

module.exports = router