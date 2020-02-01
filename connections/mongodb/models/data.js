var connection = require("../conn-1");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var mySchema = new Schema({
    abbreviation: { type: String, trim: true },
    meaning: { type: String, trim: true }
}, { strict: false });

module.exports = connection.model("abbreviation", mySchema, "abbreviation");