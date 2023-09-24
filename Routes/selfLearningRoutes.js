const express=require("express");
const {getCourseModules,getAllSelfCourses} = require("../controllers/selfLearningController");
const router=express.Router();
router.get("/",getAllSelfCourses)
router.get("/:id",getCourseModules);
module.exports=router;