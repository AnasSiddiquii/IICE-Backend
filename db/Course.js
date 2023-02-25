const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    sname: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('courses',courseSchema)