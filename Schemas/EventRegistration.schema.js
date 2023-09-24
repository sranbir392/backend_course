const mongoose = require("mongoose");

const eventRegitrationSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "events",
  },
});

const EventRegistrationModel = mongoose.model(
  "eventregistrations",
  eventRegitrationSchema
);

module.exports = EventRegistrationModel;
