const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");

const allCourseRouter = require("./Routes/allcourseRoutes");
const selfLearningRouter = require("./Routes/selfLearningRoutes");
const msatrouter=require("./Routes/msatpassRoute");

const { MONGO_URL, PORT } = require("./globals");
const app = express();
app.use(cors());
app.use(express.json());

// User Related Rout
app.use("/api/selflearning",selfLearningRouter)
//All Courses Route
app.use("/api/allcourses",allCourseRouter) ;

app.use("/api/msat",msatrouter);


const start = async () => {
  try {
    await connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT || 8080, () => {
      console.log(`Server Started on port ${PORT || 8080}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

start();