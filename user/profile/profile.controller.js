const User = require('../model')

exports.fetchProfile = (req, res) => {
    const _b = req.body
    User.findOne({
        where: {
            id: _b.userId
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.send(err)
    })
}