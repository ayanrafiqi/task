const Marks = require("../models/marksModel");
const asyncHandler = require("express-async-handler");

// @desc Fetch all the Marks
// @route GET  api/Marks
// @access Public

const getAllMarks = asyncHandler(async (req, res) => {
  const pageSize = 10; //how many Marks you want to show per page
  const page = Number(req.query.pageNumber) || 1; //what page we are in  ?pageNumber=2/1/3

  const keyword =
    req.query.keyword === "undefined"
      ? {}
      : {
          name: { $regex: req.query.keyword, $options: "i" },
        };

  const count = await Marks.countDocuments({ ...keyword });
  const marks = await Marks.find({ ...keyword })
    .populate("teacher", "name")
    .populate("student", "name")
    .limit(pageSize)
    .skip(pageSize * (page - 1)); //receives a number as a parameter and allows the user to specify the number of documents to skip.
  res.json({ marks, page, pages: Math.ceil(count / pageSize) });
});

// @desc create new Marks
// @route POST api/Marks
// @access Private/Admin only

const createMarks = asyncHandler(async (req, res) => {
  const { studentId, teacherId, subject, obtainedMarks, totalMarks, examDate } =
    req.body;

  const marks = new Marks({
    student: studentId,
    teacher: teacherId,
    subject,
    obtainedMarks,
    totalMarks,
    examDate,
  });
  const createdMarks = await marks.save();
  res.status(201).json(createdMarks);
});

// @desc remove one specific Marks
// @route DELETE api/Marks/id
// @access Private/Admin only

const deleteMarks = asyncHandler(async (req, res) => {
  const marks = await Marks.findById(req.params.id);
  if (marks) {
    await marks.deleteOne();
    res.json({ message: `{${marks.name} deleted Successfully}` });
  } else {
    res.status(404);
    throw new Error("Marks not found");
  }
});

// @desc edit one specific Marks
// @route PUT api/Marks/id
// @access Private/Admin only

const updateMarks = asyncHandler(async (req, res) => {
  const { studentId, teacherId, subject, obtainedMarks, totalMarks, examDate } =
    req.body;
  const marks = await Marks.findById(req.params.id);

  if (marks) {
    marks.student = studentId;
    marks.teacherId = teacherId;
    marks.subject = subject;
    marks.obtainedMarks = obtainedMarks;
    marks.totalMarks = totalMarks;
    marks.examDate = examDate;

    await marks.save();
    res.json(marks);
  } else {
    res.status(404).send("Marks not Found");
  }
});

// @desc Fetch one specific Marks
// @route GET api/marks/id
// @access Public

const getMarks = asyncHandler(async (req, res) => {
  const marks = await Marks.findById(req.params.id)
    .populate("teacher", "name")
    .populate("student", "name");

  if (marks) {
    res.json(marks);
  } else {
    res.status(404);
    throw new Error("Marks not found");
  }
});

module.exports = {
  getAllMarks,
  getMarks,
  createMarks,
  deleteMarks,
  updateMarks,
};
