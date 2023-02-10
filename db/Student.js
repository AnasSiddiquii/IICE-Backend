const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:String,
    father:String,
    mother:String,
    dob:String,
    email:String, 
    contact:String,
    altContact:String,
    idProof:String,
    address:String,
    photo:String,
    level:String,
    password:String,
    post:String
})

module.exports = mongoose.model('students',studentSchema)