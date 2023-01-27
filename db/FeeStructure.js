const mongoose = require('mongoose')

const FeeStructureSchema = new mongoose.Schema({
    fname:String,
    cName:String,
    ctype:String,
    address:String,
    email:String,
    contact:String,
    altContact:String, 
    idProof:String,
    account:String
})

module.exports = mongoose.model('feestructure',FeeStructureSchema)