const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  profilePic: { type: String, required: true },
  about: { type: String, required: true },
  designation: { type: String, required: true },
});
const InstructorModel = mongoose.model("instructors", instructorSchema);
module.exports = InstructorModel;
