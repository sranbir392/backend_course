const express = require("express");

const AuthMiddleware = require("../middleware/Auth/index.js");
const instructorController = require("../controllers/instructorController");
const instructorRouter = express.Router();
// get all the instructor Data
instructorRouter.get("/", instructorController.getAllInstructor);

// To get instructor based on userID
instructorRouter.get("/:userID", instructorController.instructorgetByUserId);

// To add new instructor to the database
instructorRouter.post(
  "/",
  AuthMiddleware("admin"),
  instructorController.addInstructor
);

// To update the instructor
instructorRouter.put(
  "/update/:UserID",
  AuthMiddleware("admin"),
  instructorController.updateInstructor
);

// To delete the instructor
instructorRouter.delete(
  "/delete/:userID",
  AuthMiddleware("admin"),
  instructorController.deleteInstructor
);

module.exports = instructorRouter;
