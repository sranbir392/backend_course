const mongoose = require("mongoose");

const currentCourseSchema = new mongoose.Schema({
  startDate: { type: Number, required: true },
  applicationDeadlline: { type: Number, required: true },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "courses",
  },
  cuttOff: { type: Number, required: true },
});

const CurrentCourseModel = mongoose.model(
  "currentcourses",
  currentCourseSchema
);

module.exports = CurrentCourseModel;
