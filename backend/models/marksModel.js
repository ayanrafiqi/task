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
  name: { type: String, required: true },
  class: { type: String, required: true },
  subject: { type: String },
  marks: { type: String },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Marks", marksSchema);
