const Student = require("../models/studentModel");
const asyncHandler = require("express-async-handler");

// @desc Fetch all the Student
// @route GET  api/Students
// @access Public

const getAllStudents = asyncHandler(async (req, res) => {
  const pageSize = 10; //how many Student you want to show per page
  const page = Number(req.query.pageNumber) || 1; //what page we are in  ?pageNumber=2/1/3

  const keyword =
    req.query.keyword === "undefined"
      ? {}
      : {
          name: { $regex: req.query.keyword, $options: "i" },
        };

  const count = await Student.countDocuments({ ...keyword });
  const students = await Student.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1)); //receives a number as a parameter and allows the user to specify the number of documents to skip.
  res.json({ students, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch one specific Student
// @route GET api/Students/id
// @access Public

const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error("student not found");
  }
});

// @desc create new Student
// @route POST api/Students
// @access Private/Admin only

const createStudent = asyncHandler(async (req, res) => {
  const { studentId, name, std } = req.body;

  const student = new Student({
    name,
    studentId,
    std,
  });
  const createdStudent = await student.save();
  res.status(201).json(createdStudent);
});

// @desc remove one specific Student
// @route DELETE api/Students/id
// @access Private/Admin only

const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (student) {
    await Student.deleteOne();
    res.json({ message: `{${student.name} deleted Successfully}` });
  } else {
    res.status(404);
    throw new Error("Student not found");
  }
});

// @desc edit one specific Student
// @route PUT api/Students/id
// @access Private/Admin only

const updateStudent = asyncHandler(async (req, res) => {
  const { name, std, studentId } = req.body;
  const student = await Student.findById(req.params.id);

  if (student) {
    student.name = name;
    student.std = std;
    student.studentId = studentId;
    await student.save();
    res.json(student);
  } else {
    res.status(404).send("Student not Found");
  }
});

module.exports = {
  getAllStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
};
