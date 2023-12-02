const express = require("express");
const router = express.Router();
const {
  createMarks,
  updateMarks,
  getAllMarks,
  getMarks,
} = require("../controllers/marksController");

router.route("/").post(createMarks).get(getAllMarks);
router.route("/:id").patch(updateMarks).get(getMarks);

module.exports = router;
