const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('sessions',sessionSchema)