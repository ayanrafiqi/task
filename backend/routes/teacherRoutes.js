const express = require("express");
const router = express.Router();
const {
  createTeacher,
  updateTeacher,
  getAllTeachers,
  getTeacher,
} = require("../Controllers/TeacherController");

router.route("/").post(createTeacher).get(getAllTeachers);
router.route("/:id").patch(updateTeacher).get(getTeacher);

module.exports = router;
