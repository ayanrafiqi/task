const express = require("express");
const router = express.Router();
const {
  createStudent,
  updateStudent,
  getAllStudents,
  getStudent,
} = require("../Controllers/StudentController");

router.route("/").post(createStudent).get(getAllStudents);
router.route("/:id").patch(updateStudent).get(getStudent);

module.exports = router;
