const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: { type: String, required: true },
  subjects: [{ type: String }],
});

module.exports = mongoose.model("Teacher", teacherSchema);
