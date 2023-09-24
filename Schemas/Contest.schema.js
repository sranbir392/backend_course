const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  quesID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "questions",
    },
  ],
  deadline: { type: Number, required: true },
});

const ContestModel = mongoose.model("contests", contestSchema);

module.exports = ContestModel;
