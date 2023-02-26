const mongoose = require('mongoose')

const FeeStructureSchema = new mongoose.Schema({
    month1: {
        type: String,
        required: true
    },
    month3: {
        type: String,
        required: true
    },
    month6: {
        type: String,
        required: true
    },
    month9: {
        type: String,
        required: true
    },
    month12: {
        type: String,
        required: true
    },
    uname: {
        type: String,
        required: true
    },
    cname: {
        type: String,
        required: true
    },
    sname: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('feestructure',FeeStructureSchema)