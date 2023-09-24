const mongoose=require("mongoose");
const SelfLearningModule=new mongoose.Schema({
    num:{ type: Number, required: true },
    description:{ type: String, required: true },
    subjects:{
      type: [{ type: String, required: true }],
      required:true,

    },
    selfLearningCourseId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "selflearning"
      },
})
const SelfLearningModuleModel=mongoose.model("selflearningmodule",SelfLearningModule)
module.exports=SelfLearningModuleModel;