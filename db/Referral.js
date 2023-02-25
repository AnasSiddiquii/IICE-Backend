const mongoose = require('mongoose')

const referralSchema = new mongoose.Schema({
    l5: {
        type: String,
        required: true
    },
    l4: {
        type: String,
        required: true
    },
    l3: {
        type: String,
        required: true
    },
    l2: {
        type: String,
        required: true
    },
    l1: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('referral',referralSchema)