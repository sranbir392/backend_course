const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  roleID: {
    type: String,
    required: true,
    ref: "roles",
  },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
