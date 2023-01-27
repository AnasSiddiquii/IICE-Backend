const mongoose = require('mongoose')

const emitenureSchema = new mongoose.Schema({
    month:String
})

module.exports = mongoose.model('emitenures',emitenureSchema)