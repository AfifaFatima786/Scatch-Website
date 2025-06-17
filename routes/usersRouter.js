const express=require('express');
const router=express.Router();
const userModel=require("../models/usermodel")
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken");
const { generateToken }=require("../utils/generateToken")
const isLoggedIn=require("../middlewares/isLoggedIn")
const {registerUser,loginUser,logoutUser,editaddress}=require("../controllers/authController")


router.post("/register",registerUser);

router.post("/login",loginUser);





router.get("/logout",logoutUser);

router.put("/updateaddress",isLoggedIn,editaddress);





module.exports=router;