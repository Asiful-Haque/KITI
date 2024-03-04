const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    Name: String,
    Description: String,
    Price: Number,
});

const foodSchemaModel = mongoose.model("collection2", foodSchema);

module.exports = foodSchemaModel;
