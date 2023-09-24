const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    value: { type: String, required: true },
    expiery: { type: Number, required: true },
    userID: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "users"}
});

const OTPModel = mongoose.model("otps", otpSchema);

module.exports = OTPModel;