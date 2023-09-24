const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  Duration: {
    type: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    required: true,
  },
  image: { type: String, required: true },
  description: { type: String, required: true },
  subjects: {
    type: [{ type: String, required: true }],
    required: true,
    unique: true,
  },
});

const CourseModel = mongoose.model("courses",courseSchema);

module.exports = CourseModel;
