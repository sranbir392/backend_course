const mongoose = require("mongoose");

const eventTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const EventTypeModel = mongoose.model("eventtypes", eventTypeSchema);

module.exports = EventTypeModel;
