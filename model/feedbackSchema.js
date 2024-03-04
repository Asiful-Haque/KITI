const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    Name: String,
    Feedback: String,
    Status: String,
});

const feedbackSchemaModel = mongoose.model("collection4", feedbackSchema);

module.exports = feedbackSchemaModel;
