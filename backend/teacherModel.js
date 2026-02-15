const mongoose = require("mongoose");

// Separate connection for teacherDB
mongoose.createConnection("mongodb://127.0.0.1:27017/teacherDB");

const teacherSchema = new mongoose.Schema({
    name: String,
    email: String,
    employeeId: String,
    department: String,
    password: String
});

module.exports = mongoose.model("Teacher", teacherSchema);
