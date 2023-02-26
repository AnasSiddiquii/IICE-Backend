const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    img:String,
    name:String
});

module.exports = mongoose.model("files", fileSchema);