const mongoose = require('mongoose')

const specialisationSchema = new mongoose.Schema({
    cname:String,
    fname:String,
    sname:String,
    price:String
})

module.exports = mongoose.model('specialisations',specialisationSchema)