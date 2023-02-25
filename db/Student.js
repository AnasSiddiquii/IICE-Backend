const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    father: {type: String, required: true},
    mother: {type: String, required: true},
    dob: {type: String, required: true},
    email: {type: String, required: true}, 
    contact: {type: String, required: true},
    altContact: {type: String, required: true},
    idProof: {type: String, required: true},
    address: {type: String, required: true},
    photo: {type: String, required: true},
    level: {type: String, required: true},
    password: {type: String, required: true},
    post: {type: String, required: true}
})

module.exports = mongoose.model('students',studentSchema)