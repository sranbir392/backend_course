const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  contestID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "contests",
  },
  quesID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "questions",
  },
  ansID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "answers",
  },
});

const AttemptModel = mongoose.model("attempts", attemptSchema);

module.exports = AttemptModel;
