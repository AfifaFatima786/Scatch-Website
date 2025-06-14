const express=require('express');
const router=express.Router();
const userModel=require("../models/usermodel")
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken");
const { generateToken }=require("../utils/generateToken")
const {registerUser,loginUser,logoutUser}=require("../controllers/authController")


// router.get("/",function(req,res){
//     res.send("hey its working");
// })

router.post("/register",registerUser);

router.post("/login",loginUser);



router.get("/logout",logoutUser);





module.exports=router;