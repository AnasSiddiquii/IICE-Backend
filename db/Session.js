const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    start:String,
    end:String
})

module.exports = mongoose.model('sessions',sessionSchema)