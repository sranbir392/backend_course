const mongoose = require("mongoose");

const alumniSchema = new mongoose.Schema({
  profilePic: { type: String, required: true },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  linkedin: { type: String, required: true },
  tagLine: { type: String, required: true },
  comment: { type: String, required: true },
});

const AlumniModel = mongoose.model("alumnies", alumniSchema);

module.exports = AlumniModel;
