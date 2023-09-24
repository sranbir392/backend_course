const { AlumniModel, UsersModel } = require("../Schemas");

const { z } = require("zod");

// Zod schema for Alumni

const AlumniDataSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(10).max(10),
  name: z.string().max(200),
  profilePic: z.string().min(1).max(255).optional(),
  linkedin: z.string().min(1).max(255),
  tagLine: z.string().min(1).max(255),
  comment: z.string().min(1).max(255),
});
// get alumni by userId

const alumnigetByUserId = async (req, res) => {
  const userID = req.params.userID;
  try {
    const alumnidata = await AlumniModel.findOne({ userID: userID });
    if (!alumnidata) {
      return res.status(404).json({ message: "Alumni Not Found" });
    }
    res.send(alumnidata);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all the alumni Data
const getAllalumni = async (req, res) => {
  try {
    let temp = await AlumniModel.find().populate("userID");
    res.status(200).json(temp);
  } catch (err) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// To add new Alumni to the database
const addAlumni = async (req, res) => {
  try {
    AlumniDataSchema.parse(req.body);
    const user = await UsersModel.create({
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
      roleID: "6502d8b1b7808eb540ef7a43",
    });
    const alumni = await AlumniModel.create({
      profilePic: req.body.profilePic,
      linkedin: req.body.linkedin,
      tagLine: req.body.tagLine,
      comment: req.body.comment,
      userID: user._id,
    });
    res.status(200).json({
      isError: false,
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePic: alumni.profilePic,
        linkedin: alumni.linkedin,
        tagLine: alumni.tagLine,
        comment: alumni.comment,
      },
    });
  } catch (err) {
    console.error(error);
    res.status(400).send({ message: "Alumni Validation Failed" });
  }
};

// To update the alumni

const updateAlumni = async (req, res) => {
  try {
    const userId = req.params.userID;
    const updateData = req.body;
    const validData = AlumniDataSchema.parse(updateData);
    const alumni = await AlumniModel.findOneAndUpdate(
      { userID: userId },
      validData,
      { new: true }
    );
    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }
    res.status(200).json(alumni);
  } catch (err) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Alumni validation failed", error: error.message });
  }
};

const deleteAlumni = async (req, res) => {
  try {
    const userId = req.params.userID;
    const deleteData = await AlumniModel.findOneAndDelete({ userID: userId });
    if (!deleteData) {
      return res.status(404).json({
        error: "Alumni not Found",
      });
    }
    return res.status(200).json({ message: "Alumni delete Successfullly" });
  } catch (err) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  alumnigetByUserId,
  getAllalumni,
  addAlumni,
  updateAlumni,
  deleteAlumni,
};
