const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Student DB Connection
const studentConnection = mongoose.createConnection(
  "mongodb://127.0.0.1:27017/studentDB"
);

const teacherConnection = mongoose.createConnection(
  "mongodb://127.0.0.1:27017/teacherDB"
);

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  studentId: String,
  password: String,
  attendance: {
    type: Number,
    default: 75   // Default attendance %
  }
});

const Student = studentConnection.model("Student", studentSchema);

// Teacher Schema
const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  employeeId: String,
  department: String,
  password: String,
});

const Teacher = teacherConnection.model("Teacher", teacherSchema);

// Student Signup API
app.post("/student/signup", async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json({ message: "Student Registered Successfully" });
});
// Student Login API
app.post("/student/login", async (req, res) => {
  const { studentId, password } = req.body;

  const student = await Student.findOne({ studentId });

  if (!student) {
    return res.status(404).json({ message: "User does not exist" });
  }

  if (student.password !== password) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.json({ message: "Login Successful", student });
});

// Get Student Details by Student ID
app.get("/student/:studentId", async (req, res) => {
  try {
    const student = await Student.findOne({ 
        studentId: req.params.studentId 
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});


// Teacher Signup API
app.post("/teacher/signup", async (req, res) => {
  const newTeacher = new Teacher(req.body);
  await newTeacher.save();
  res.json({ message: "Teacher Registered Successfully" });
});
// Teacher Login API
app.post("/teacher/login", async (req, res) => {
  const { employeeId, password } = req.body;

  const teacher = await Teacher.findOne({ employeeId });

  if (!teacher) {
    return res.status(404).json({ message: "User does not exist" });
  }

  if (teacher.password !== password) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  res.json({ message: "Login Successful", teacher });
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
