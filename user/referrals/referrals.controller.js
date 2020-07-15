const User = require('../model').model

// Functions
const parentTopUp = (amount, id) => {
    return User.findOne({
        where: {
            id: id
        }
    })
        .then(async thatUser => {
            let balance = thatUser.balance + amount

            return await thatUser.update({
                balance: balance
            })
                .then(data => {
                    let ans = {}
                    ans.data = data
                    ans.status = !(data == null)

                    return ans
                })
                .catch(err => {
                    let ans = {}
                    ans.error = err.message
                    ans.status = false

                    return ans
                })
        })
        .catch(err => {
            let ans = {}
            ans.error = err.message
            ans.status = false

            return ans
        })
}


// Routers
const postParentTopUp = (req, res) => {
    const _b = req.body
    parentTopUp(_b.amount, _b.parentId)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}


module.exports = {
    parentTopUp,
    postParentTopUp
}