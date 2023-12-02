const express = require("express");
const router = express.Router();
const { getAllMarks } = require("../controllers/marksController");

router.route("/").get(getAllMarks);

module.exports = router;
