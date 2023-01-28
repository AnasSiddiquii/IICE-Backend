const mongoose = require('mongoose')

const specialisationSchema = new mongoose.Schema({
    fname:String,
    sname:String,
})

module.exports = mongoose.model('specialisations',specialisationSchema)