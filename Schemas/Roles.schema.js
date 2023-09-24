const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const RolesModel = mongoose.model("roles", rolesSchema);

module.exports = RolesModel;
