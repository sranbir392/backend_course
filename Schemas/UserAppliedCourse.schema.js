const mongoose = require("mongoose");

const userAppliedCourseSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "roles",
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "currentcourses",
  },
});

const UserAppliedCourseModel = mongoose.model(
  "userappliedcourses",
  userAppliedCourseSchema
);

module.exports = UserAppliedCourseModel;
