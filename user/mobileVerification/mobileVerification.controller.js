const User = require('../model')
const MobileVerification = require('./mobileVerification.model')
const msgSender = require('../../services/msg91.service')


exports.sendOTP = (req, res) => {
    const _b = req.body
    User.findOne({
        where: {
            PhoneNo: _b.mobile
        }
    })
        .then(async user => {
            if (user != null) {
                return res.send({
                    status: false,
                    message: "Mobile number already registered with an user",
                    user
                })
            } else {
                let otp = Math.floor(100000 + Math.random() * 900000)

                await msgSender.sendOTP(_b.mobile.toString(), otp.toString())
                    .then(back => {
                        if (!back.status) throw new Error(back.error)
                        MobileVerification.findOrCreate({
                            where: {
                                mobile: _b.mobile.toString()
                            },
                            defaults: {
                                otp: otp.toString(),
                                msgId: back.response
                            }
                        })
                            .then(async val => {
                                if (!val[1]) {
                                    let record = val[0]

                                    if (record.successfullyVerified) throw new Error("Mobile number is already verified by OTP")

                                    record.update({
                                        otp: otp.toString(),
                                        msgId: back.response
                                    })
                                    .then(ans => {
                                        res.send(ans)
                                    })
                                    .catch(err => {
                                        res.send({
                                            status: false,
                                            error: err.message
                                        })
                                    })
                                } else {
                                    res.send({
                                        status: true,
                                        value: val
                                    })
                                }
                            })
                            .catch(err => {
                                res.send({
                                    status: false,
                                    error: err.message
                                })
                            })
                    })
                    .catch(err => {
                        res.send({
                            status: false,
                            error: err.message
                        })
                    })
            }
        })
        .catch(err => {
            res.send({
                status: false,
                error: err
            })
        })
}

exports.verifyOTP = (req, res) => {
    const _b = req.body

    MobileVerification.findOne({
        where: {
            mobile: _b.mobile,
        }
    })
    .then(data => {
        if (data == null) throw new Error("OTP wasn't sent yet.")
        
        if (data.otp === _b.otp.toString()) {
            data.update({
                successfullyVerified: true
            })
            .then(resolved => {
                res.send(resolved)
            })
            .catch(err => {
                res.send({
                    status: false,
                    error: err
                })
            })
        } else {
            throw new Error("OTP mismatched. Try again.")
        }
    })
    .catch(err => {
        res.send({
            status: false,
            error: err
        })
    })
}