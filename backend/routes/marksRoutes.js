const express = require("express");
const router = express.Router();
const {
  createMarks,
  updateMarks,
  getAllMarks,
  getMarks,
  deleteMarks,
} = require("../controllers/marksController");

router.route("/").post(createMarks).get(getAllMarks);
router.route("/:id").patch(updateMarks).get(getMarks).delete(deleteMarks);

module.exports = router;
