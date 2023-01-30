const mongoose = require('mongoose')

const referralSchema = new mongoose.Schema({
    l5:String,
    l4:String,
    l3:String,
    l2:String,
    l1:String,
})

module.exports = mongoose.model('referral',referralSchema)