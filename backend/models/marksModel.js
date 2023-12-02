const mongoose = require("mongoose");

const marksSchema = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
  subject: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  obtainedMarks: { type: Number, required: true },
  examDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Marks", marksSchema);
