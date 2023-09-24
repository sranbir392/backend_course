const express = require("express");
const AuthMiddleware = require("../middleware/Auth/index.js");
const allCoursesController=require("../controllers/allCoursesController.js")
const allCoursesRouter=express.Router();
allCoursesRouter.get("/",allCoursesController.getAllCourses);
allCoursesRouter.get("/:id",allCoursesController.getCourseByID);

module.exports=allCoursesRouter;