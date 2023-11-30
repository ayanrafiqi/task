const Teacher = require("../models/teacherModel");
const asyncHandler = require("express-async-handler");

// @desc Fetch all the Teacher
// @route GET  api/Teachers
// @access Public

const getAllTeachers = asyncHandler(async (req, res) => {
  const pageSize = 10; //how many Teacher you want to show per page
  const page = Number(req.query.pageNumber) || 1; //what page we are in  ?pageNumber=2/1/3

  const keyword =
    req.query.keyword === "undefined"
      ? {}
      : {
          name: { $regex: req.query.keyword, $options: "i" },
        };

  const count = await Teacher.countDocuments({ ...keyword });
  const teachers = await Teacher.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1)); //receives a number as a parameter and allows the user to specify the number of documents to skip.
  res.json({ teachers, page, pages: Math.ceil(count / pageSize) });
});

// @desc Fetch one specific Teacher
// @route GET api/Teachers/id
// @access Public

const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (teacher) {
    res.json(teacher);
  } else {
    res.status(404);
    throw new Error("Teacher not found");
  }
});

// @desc create new Teacher
// @route POST api/Teachers
// @access Private/Admin only

const createTeacher = asyncHandler(async (req, res) => {
  const { name, subjects } = req.body;

  const teacher = new Teacher({
    name,
    subjects,
  });
  const createdTeacher = await teacher.save();
  res.status(201).json(createdTeacher);
});

// @desc remove one specific Teacher
// @route DELETE api/Teachers/id
// @access Private/Admin only

const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (teacher) {
    await Teacher.deleteOne();
    res.json({ message: `{${teacher.name} deleted Successfully}` });
  } else {
    res.status(404);
    throw new Error("Teacher not found");
  }
});

// @desc edit one specific Teacher
// @route PUT api/Teachers/id
// @access Private/Admin only

const updateTeacher = asyncHandler(async (req, res) => {
  const { name, std, subjects } = req.body;
  const teacher = await Teacher.findById(req.params.id);

  if (teacher) {
    teacher.name = name;
    teacher.std = std;
    teacher.subjects = subjects;
    res.json(teacher);
  } else {
    res.status(404).send("teacher Not found");
  }
});

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  deleteTeacher,
  updateTeacher,
};
