const mongoose = require('mongoose')

const detailSchema = new mongoose.Schema({
    franchiseName:String,
    studentName:String,
    universityName:String,
    courseName:String,
    specialisationName:String,
    price:String,
    sessionYear:String,
    emiDuration:String,
    emiAmount:String
})

module.exports = mongoose.model('details',detailSchema)