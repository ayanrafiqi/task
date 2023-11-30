const Marks = require("../models/MarksModel");
const asyncHandler = require("express-async-handler");

// @desc Fetch all the Marks
// @route GET  api/Markss
// @access Public

const getAllMarks = asyncHandler(async (req, res) => {
  const pageSize = 10; //how many Marks you want to show per page
  const page = Number(req.query.pageNumber) || 1; //what page we are in  ?pageNumber=2/1/3

  //   const keyword =
  //     req.query.keyword === "undefined"
  //       ? {}
  //       : {
  //           name: { $regex: req.query.keyword, $options: "i" },
  //         };

  const count = await Marks.countDocuments({ ...keyword });
  const marks = await Marks.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1)); //receives a number as a parameter and allows the user to specify the number of documents to skip.
  res.json({ marks, page, pages: Math.ceil(count / pageSize) });
});

module.exports = {
  getAllMarks,
};
