const { InstructorModel } = require("../Schemas");
const { z } = require("zod");
const UserModel = require("../Schemas/Users.schema");

// Zod schema for instructor

const instructorDataSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  name: z.string().max(200),
  profilePic: z.string().min(1).max(255),
  about: z.string().min(1).max(255),
  designation: z.string().min(1).max(255),
});

// get all the instructor Data
const getAllInstructor = async (req, res) => {
  try {
    let instructors = await InstructorModel.find().populate("userID");
    res.status(200).json({
      isError: false,
      data: instructors,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// get instructor by userId
const instructorgetByUserId = async (req, res) => {
  const userID = req.params.userID;
  try {
    const instructordata = await InstructorModelnstructorModel.findOne({
      userID: userID,
    });
    if (!instructordata) {
      return res.status(404).json({ message: "instructor Not Found" });
    }
    res.send(instructordata);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// To add new instructor to the database
const addInstructor = async (req, res) => {
  try {
    instructorDataSchema.parse(req.body);
    const user = await UserModel.create({
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      roleID: "6502d8b1b7808eb540ef7a43",
    });
    const instructor = await InstructorModel.create({
      profilePic: req.body.profilePic,
      about: req.body.about,
      designation: req.body.designation,
      userID: user._id,
    });
    res
      .status(200)
      .json({
        isError: false,
        data: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          profilePic: instructor.profilePic,
          about: instructor.about,
          designation: instructor.designation,
        },
      });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "instructor Validation Failed" });
  }
};

// To update the instructor

const updateInstructor = async (req, res) => {
  try {
    const userId = req.params.userID;
    const updateData = req.body;
    const validData = instructorDataSchema.parse(updateData);
    const instructor = await InstructorModel.findOneAndUpdate(
      { userID: userId },
      validData,
      { new: true }
    );
    if (!instructor) {
      return res.status(404).json({ message: "instructor not found" });
    }
    res.status(200).json(instructor);
  } catch (err) {
    console.error(error);
    res
      .status(400)
      .json({ message: "instructor validation failed", error: error.message });
  }
};

// To delete the instructor
const deleteInstructor = async (req, res) => {
  try {
    const userId = req.params.userID;
    const deleteData = await InstructorModel.findOneAndDelete({
      userID: userId,
    });
    if (!deleteData) {
      return res.status(404).json({
        error: "instructor not Found",
      });
    }
    return res.status(200).json({ message: "instructor delete Successfullly" });
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllInstructor,
  instructorgetByUserId,
  addInstructor,
  updateInstructor,
  deleteInstructor,
};
