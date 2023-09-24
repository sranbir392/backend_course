const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  pic: { type: String, required: true },
  instructorID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "instructors",
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  from: { type: Number, required: true },
  to: { type: Number, required: true },
  typeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "eventtypes",
  },
  zoomLink: { type: String, required: true },
});
const EventModel = mongoose.model("events", eventSchema);

module.exports = EventModel;
