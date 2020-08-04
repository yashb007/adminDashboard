const BannerModel = require('./banner.model')
const BaseUrl = require('../../enviornment/index').base.url
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

exports.addBanner = (req, res) => {
    const _b = req.body
    const files = req.dir
    const enName = _b.enName
    const arName = _b.arName

    let values = []

    for (let i = 0; i < files.length; ++i) {
        let obj = {}

        obj.bannerName_en = enName[i]
        obj.bannerName_ar = arName[i]
        let url = BaseUrl + "uploads/" + files[i].fullName
        obj.url = url
        obj.mediaType = files[i].type

        values.push(obj)
    }

    BannerModel.bulkCreate(values)
        .then(data => res.send(data))
        .catch(err => res.send(err))
}

exports.findBanners = (req, res) => {
    const _b = req.body

    BannerModel.findAll({
        attributes: [
            [`bannerName_${req.LanguageCode}`, 'bannerName'],
            'url',
            'mediaType',
            'createdAt',
            'updatedAt',
            'id'
        ],
        order: [
            ['createdAt', 'DESC']
        ]
    })
        .then(data => {
            if (data.length === 0) throw new Error('No Banners Found')
            res.send(data)
        })
        .catch(err => res.send({
            error: err.message
        }))
}

exports.removeBanner = (req, res) => {
    const _b = req.body

    BannerModel.findOne({
        where: {
            id: _b.bannerId,
        }
    })
        .then(async data => {
            if (data == null) throw new Error("No Banner found")
            let url = data.url.replace(BaseUrl, '')

            await unlinkAsync(url)

            BannerModel.destroy({
                where: {
                    id: _b.bannerId,
                }
            })
                .then(val => {
                    res.send({
                        status: val,
                    })
                })
                .catch(err => res.send({
                    error: err.message
                }))

        })
        .catch(err => res.send({
            error: err.message
        }))
}

exports.updateBanner = (req, res) => {
    const _b = req.body

    BannerModel.findOne({
        where: {
            id: _b.bannerId,
        }
    })
        .then(data => {
            if (data == null) throw new Error("No Banner found")

            let updater = {}
            updater.bannerName_ar = _b.bannerName_ar
            updater.bannerName_en = _b.bannerName_en

            data.update(updater)
                .then(result => {
                    res.send(result)
                })
                .catch(err => {
                    res.send(err)
                })
        })
        .catch(err => {
            res.send(err)
        })
}