const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
    studentName:String,
    courseName:String,
    specialisationName:String,
    universityName:String,
    sessionYear:String,
    emiTenure:String,
    emiAmount:String
})

module.exports = mongoose.model('details',detailSchema)