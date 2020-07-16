const AppMenu = require('./appMenu.model')
const BaseUrl = require('../../enviornment/index').base.url
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

exports.addMenu = (req, res) => {
    const _b = req.body
    const enName = _b.enName
    const arName = _b.arName
    const files = req.dir
    const status = _b.status

    let values = []

    for (let i=0; i<files.length; ++i) {
        let creator = {}

        creator.menuName_en = enName[i]
        creator.menuName_ar = arName[i]
        creator.url = BaseUrl + "uploads/" + files[i].fullName
        creator.mediaType = files[i].type

        creator.status = !(status[i] === 'false') // default value is true for status. So, if no values is send(i.e., undefined) then undefined !== 'false'.

        values.push(creator)
    }

    AppMenu.bulkCreate(values)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}

exports.deleteMenu = (req, res) => {
    const _b = req.body

    AppMenu.findOne({
        where: {
            id: _b.menuId,
        }
    })
        .then(async data => {
            if (data == null) throw new Error("No Menu found")
            let url = data.url.replace(BaseUrl, '')

            await unlinkAsync(url)

            AppMenu.destroy({
                where: {
                    id: _b.menuId,
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

exports.updateMenu = (req, res) => {
    const _b = req.body

    AppMenu.findOne({
        where: {
            id: _b.menuId,
        }
    })
        .then(data => {
            if (data == null) throw new Error("No Banner found")

            let updater = {}
            updater.menuName_ar = _b.menuName_ar
            updater.menuName_en = _b.menuName_en
            updater.status = _b.status

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

exports.fetchMenus = (req, res) => {
    const _b = req.body

    AppMenu.findAll({
        attributes: [
            [`menuName_${req.LanguageCode}`, 'menuName'],
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
            if (data.length === 0) throw new Error('No Menu Found')
            res.send(data)
        })
        .catch(err => res.send({
            error: err.message
        }))
}