const StaticValues = require('./staticValues.model').model

// Functions

const findOrFeedDefaultValue = async (req) => {
    const _b = req

    console.log(_b)

    return await StaticValues.findOrCreate({
        where: {
            category: _b.category
        },
        defaults: {
            value: _b.value
        }
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
}

const findAllDefaultValues = async () => {
    return await StaticValues.findAll({})
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
}

const findParticularValue = async (category) => {
    return await StaticValues.findOne({
        where: {
            category: category
        }
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
}







// Controllers


const getDataOrSeed = async (req, res) => {
    const _b = req.body

    findOrFeedDefaultValue(_b)
        .then(response => {
            res.send(response)
        })
        .catch(e => res.send(e))
}

const listAllDefaultValues = (req, res) => {
    findAllDefaultValues()
        .then(data => res.send(data))
        .catch(err => res.send(err))
}

const getParticularValue = (req, res)  => {
    const _b = req.body
    findParticularValue(_b.category)
        .then(data => res.send(data))
        .catch(err => res.send(err))

}


module.exports = {
    findOrFeedDefaultValue,
    getDataOrSeed,
    listAllDefaultValues,
    findAllDefaultValues,
    findParticularValue,
    getParticularValue
}