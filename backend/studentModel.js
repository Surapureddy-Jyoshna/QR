const mongoose = require("mongoose");

// Connect to studentDB
mongoose.createConnection("mongodb://127.0.0.1:27017/studentDB");

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    studentId: String,
    password: String
});

module.exports = mongoose.model("Student", studentSchema);
