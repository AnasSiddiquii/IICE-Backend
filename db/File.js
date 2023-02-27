const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name:String,
    img:String
});

module.exports = mongoose.model("files", fileSchema);