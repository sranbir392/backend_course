const SelfLearningModel=require("../Schemas/SelfLearning.schema");
const SelfLearningModuleModel=require("../Schemas/SelfLearningModule.schema")

const getAllSelfCourses=async(req,res)=>{
    try{
      
        let selfCourses=await SelfLearningModel.find();
        
        res.status(200).json({
            isError:false,
            data:selfCourses
        });
    }catch(err){
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}



const getCourseModules1 = async (req, res) => {
    try {
      const temp = await SelfLearningModuleModel.find();
            // .sort({num:1});

      res.status(200).json({
        isError: false,
        data: temp,
      });
    } catch (error) {
      res.status(500).json({
        isError: false,
        error,
        msg: "Internal Server Error",
      });
    }
  };
  const getCourseModules = async (req, res) => {
    try {
      const courseId = req.params.id;
      const modules = await SelfLearningModuleModel.find({ selfLearningCourseId: courseId });
  
      res.status(200).json({
        isError: false,
        data: modules,
      });
    } catch (error) {
      res.status(500).json({
        isError: true,
        error: error.message,
        msg: "Internal Server Error",
      });
    }
  };
  
  // 
module.exports={getCourseModules,getAllSelfCourses}