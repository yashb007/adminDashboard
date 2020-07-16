const msg91Cred = require('../enviornment/index').msg91
const msg = require('msg91')(msg91Cred.authkey, msg91Cred.sender, msg91Cred.route)

const util = require('util')
const MsgSend = util.promisify(msg.send)

exports.sendOTP = (mobile, OTP) => {
    return MsgSend(mobile, OTP)
        .then(done => {
            return {
                status: true,
                response: done
            }
        })
        .catch(err => {
            return {
                status: false,
                error: err
            }
        })
}

