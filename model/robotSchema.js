const mongoose = require("mongoose");

const robotSchema = mongoose.Schema({
    Name: String,
    Description: String,
    BuildDate: Date,
    CreatedBy: String,
});

const robotSchemaModel = mongoose.model("collection3", robotSchema);

module.exports = robotSchemaModel;
