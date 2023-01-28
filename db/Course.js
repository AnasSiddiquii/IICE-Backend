const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    fname:String,
    sname:String,
})

module.exports = mongoose.model('courses',courseSchema)