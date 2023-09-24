const express = require("express");
const { pass, fail } = require("../globals");
const router=express.Router();

router.get("/pass",(req,res)=> res.status(200).json(pass));
router.get("/fail",(req,res)=>res.status(200).json(fail));

module.exports=router;