const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    bestScore: {type: Number, required: true}
})

const ScoreModel = mongoose.model("scores",scoreSchema);

module.exports = ScoreModel;