const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  unitNo: { type: Number, required: true, unique: true },
  duration: { type: String, required: true, unique: true },
});

const UnitModel = mongoose.model("units", unitSchema);
module.exports = UnitModel;
