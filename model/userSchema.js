const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Address: String,
    Email: String,
    Password: String,
});

const registerSchemaModel = mongoose.model("collection1", registerSchema);

module.exports = registerSchemaModel;