const { Router } = require("express");
const UserModel = require("../Schemas/Users.schema");
const OTPModel = require("../Schemas/OTP.schema");
const { sign } = require("jsonwebtoken");
const { v4 } = require("uuid");
const sendEmail = require("../utils/Email");
const { JWT_SECRET } = require("../globals");
const otpGenerator = require('otp-generator');

const userRoute = Router();

// Sign up a new user
userRoute.post("/signup", async (req, res) => {
  const { name, email, phone, roleID } = req.body;
  try {
    const newUser = new UserModel({ name, email, phone, roleID });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Registration failed" });
  }
});

// Sign in a user
userRoute.post("/signin", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email }); // Use findOne() to find a single user
    if (!user) {
      return res.status(400).json({ error: "User No user found" });
    }
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, specialChars: false });
    await OTPModel.create({
      value: `${otp}`,
      expiery: Date.now() + 300000,
      userID: user._id
    });
    sendEmail(user.email, "Onwards OTP", `Here is your OTP:- ${otp}`)
    
    res.status(200).json({ data: "Please check your email for the OTP" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Sign in with OTP
userRoute.post("/verify", async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await UserModel.findOne({ email });
    const otpDB = await OTPModel.findOne({
      value: otp,
      userID: user?._id,
      expiery: {$gt: Date.now()}
    });
    if (!otpDB) {
      return res.status(400).json({ isError: true, message: "Invalid OTP" }); 
    }
    res.status(200).json({
      isError: false, data: {
      token: sign({ id: user._id }, JWT_SECRET)
    } }); 
  } catch (error) {
    res.status(500).json({
      isError: true,
      error
    })
    console.log(error);
  }
})
// Get all users
userRoute.get("/getuser", async (req, res) => {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users); // Return users as JSON
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = userRoute;
