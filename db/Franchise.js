const mongoose = require('mongoose')

const franchiseSchema = new mongoose.Schema({
    fname:String,
    cname:String,
    ctype:String,
    address:String,
    email:String,
    contact:String,
    altContact:String, 
    idProof:String,
    account:String,
    level:String
})

module.exports = mongoose.model('franchises',franchiseSchema)