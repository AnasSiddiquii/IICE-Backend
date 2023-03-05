const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true
    },
    studentName: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    specialisationName: {
        type: String,
        required: true
    },
    universityName: {
        type: String,
        required: true
    },
    sessionYear: {
        type: String,
        required: true
    },
    emiTenure: {
        type: String,
        required: true
    },
    emiAmount: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('details',detailSchema)