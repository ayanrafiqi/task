const express = require("express");
const {
  createStudent,
  updateStudent,
  getAllStudents,
  getStudent,
} = require("../controllers/StudentController");
const router = express.Router();

router.route("/").post(createStudent).get(getAllStudents);
router.route("/:id").patch(updateStudent).get(getStudent);

module.exports = router;
