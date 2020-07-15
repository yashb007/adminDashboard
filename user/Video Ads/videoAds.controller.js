const VideoAds = require('./videoAds.model').model

exports.addAdsBulk = (req, res) => {
    const _b = req.body
    let values = []

    for (let x of _b) {
        values.push(x)
    }

    VideoAds.bulkCreate(
        values
    )
    .then(data => {
        res.send(data)

    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

exports.listAll = (req, res) => {
    const _b = req.body

    VideoAds.findAll({})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}