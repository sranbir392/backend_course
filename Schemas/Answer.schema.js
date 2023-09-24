const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  content: { type: String, required: true },
  quesID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "questions",
  },
  isCorrect: { type: Boolean, required: true },
});

const AnswerModel = mongoose.model("answers", answerSchema);

module.exports = AnswerModel;
