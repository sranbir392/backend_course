const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  marks: { type: Number, required: true },
});

const QuestionModel = mongoose.model("questions", questionSchema);

module.exports = QuestionModel;
