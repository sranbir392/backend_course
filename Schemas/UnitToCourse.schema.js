const mongoose = require("mongoose");

const unitToCourseSchema = new mongoose.Schema({
  unitID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "units",
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "courses",
  },
  subjects: [
    {
      heading: { type: String, required: true },
      tags: [{ type: String, required: true }],
    },
  ],
});

const UnitToCourseModel = mongoose.model("unitsToCourses",unitToCourseSchema);

module.exports = UnitToCourseModel;
