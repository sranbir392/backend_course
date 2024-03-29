const { CourseModel,UnitToCourseModel } = require("../Schemas");

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
      
      let temp = await UnitToCourseModel.find({ courseID: id }).populate('courseID') // Populate the courseID field with course details
      
      res.status(200).json({
        isError:false,
        // courseData:r,
        courseDescription:temp,
      });
    } catch (err) {
      res.status(500).json({
        error: "Internal Server Error",
      });
    }

  };
  module.exports={getAllCourses,getCourseByID};