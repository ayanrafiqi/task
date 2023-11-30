const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: Number, required: true },
  std: { type: String, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
