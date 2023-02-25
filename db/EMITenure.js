const mongoose = require('mongoose')

const emitenureSchema = new mongoose.Schema({
    month: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('emitenures',emitenureSchema)