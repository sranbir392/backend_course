const express = require("express");
const {
  contestCreator,
  getQuestionByID,
  attemptQuestion,
  findAttempt,
  scoreFindByUser,
  result
} = require("../controllers/msatController");
const { AuthMiddleware } = require("../middleware");

const router = express.Router();

// This route is for creating a new Contest
router.post("/contest", AuthMiddleware("student"), contestCreator);

// Get a question and all the optons for that question
router.get("/question/:id", AuthMiddleware("student"), getQuestionByID);

// Attempt a Questions
router.post("/attempt", AuthMiddleware("student"), attemptQuestion);

// Find an attempt by ques and contest id
router.get(
  "/attempt/:quesID/:contestID",
  AuthMiddleware("student"),
  findAttempt
);

// get the result of a contest
router.get("/result/:contestID", AuthMiddleware("student"), result);

// get if user is eligible for applying or not
router.get("/score", AuthMiddleware("student"), scoreFindByUser)

module.exports = router;
