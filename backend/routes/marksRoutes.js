const express = require("express");
const router = express.Router();
const { getAllMarks } = require("../controllers/MarksController");

router.route("/").get(getAllMarks);

module.exports = router;
