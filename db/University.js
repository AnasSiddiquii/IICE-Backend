const mongoose = require('mongoose')

const universitySchema = new mongoose.Schema({
    name:String,
    logo:String,
    state:String
})

module.exports = mongoose.model('universities',universitySchema)