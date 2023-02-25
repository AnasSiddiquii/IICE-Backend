const mongoose = require('mongoose')

const franchiseSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    cname: {
        type: String,
        required: true
    },
    ctype: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    altContact: {
        type: String,
        required: true
    }, 
    idProof: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('franchises',franchiseSchema)