const { CourseModel } = require("../Schemas");

getAllCourses = async (req, res) => {
    try {
      let temp = await CourseModel.find();
      res.status(200).json(temp);
    } catch (err) {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }

  };
  getCourseByID=async (req, res) => {
    try {
      let id=req.params.id;
      let temp = await CourseModel.find({_id:id});
      res.status(200).json(temp);
    } catch (err) {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }

  };
  module.exports={getAllCourses,getCourseByID};