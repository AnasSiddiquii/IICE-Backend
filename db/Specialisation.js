const mongoose = require('mongoose')

const specialisationSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    sname: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('specialisations',specialisationSchema)