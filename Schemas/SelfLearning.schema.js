const mongoose=require("mongoose");

const selfLearningSchema=new mongoose.Schema({
    image: { type: String, required: true },
    heading: { type: String, required: true },
    level:{ type: String, required: true },
    no_of_modules:{ type: Number, required: true },
    total_time:{
        type: {
            value: { type: Number, required: true },
            unit: { type: String, required: true },
          },
          required: true,
    },
    no_of_certificate:{ type: Number,required:false },
});

const SelfLearningModel=mongoose.model("selflearning",selfLearningSchema);

module.exports= SelfLearningModel;