const Language = require('../model')

exports.selectLanguageById = (req, res, next) => {
    Language.findOne({
        where: {
            id: req.body.languageId,
        }
    })
    .then(lang => {
        if (lang == null) throw new Error("Not a valid language")

        req.LanguageCode = lang.LanguageCode
        next()
    })
    .catch(err => {
        res.send({
            status: false,
            error: err.message
        })
    })
}