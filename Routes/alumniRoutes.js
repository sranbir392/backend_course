const express = require("express");
const alumniController = require("../controllers/alumniController");
const AuthMiddleware = require("../middleware/Auth/index.js");
const alumniRouter = express.Router();
// get all the alumni Data
alumniRouter.get("/", alumniController.getAllalumni);

// To get alumni based on userID
alumniRouter.get("/:userID", alumniController.alumnigetByUserId);

// To add new Alumni to the database
alumniRouter.post("/", AuthMiddleware("admin"), alumniController.addAlumni);

// To update the alumni
alumniRouter.put(
  "/update/:UserID",
  AuthMiddleware("admin"),
  alumniController.updateAlumni
);

// To delete the alumni
alumniRouter.delete(
  "/delete/:userID",
  AuthMiddleware("admin"),
  alumniController.deleteAlumni
);

module.exports = alumniRouter;
