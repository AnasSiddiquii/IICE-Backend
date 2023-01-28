const mongoose = require('mongoose')

const FeeStructureSchema = new mongoose.Schema({
    uname:String,
    cname:String,
    sname:String,
    month1:String,
    month3:String,
    month6:String,
    month9:String,
    month12:String
})

module.exports = mongoose.model('feestructure',FeeStructureSchema)