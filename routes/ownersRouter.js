const express=require('express');
const router=express.Router();
const dotenv = require('dotenv')
const ownerModel=require("../models/ownermodel")
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken");
const { generateToken }=require("../utils/generateToken")
const isLoggedIn=require("../middlewares/isLoggedIn")
const {registerOwner,loginOwner,logoutOwner,addProducts}=require("../controllers/authControllerowner")
const isLoggedInOwner=require("../middlewares/isLoggedInOwner")



dotenv.config()


if(process.env.NODE_ENV==="development"){
router.post("/create",async (req,res)=>{
    let owners=await ownerModel.find();
    if(owners.length>0) { return res
    .status(503)
    .send("you dont have permission to create a new owner.");}

    let{fullname,email,password}=req.body;
    let createdOwner=await ownerModel.create({


    fullname,
    email,
    password,
   
    });
    res.status(201).send(createdOwner);

});
}

router.get("/addProducts",function(req,res){
    let success=req.flash("success")
    res.render("createproducts",{success,owner:true});
});

router.get("/profile",isLoggedInOwner,async function(req,res){
     
    
    let owners=await ownerModel.findOne({email:req.owner.email});
    res.render("profile",{owners,owner:true});
});

router.get("/owner_login",function(req,res){
   
   res.render("owner_login",{loggedin:false});
});




router.post("/register",registerOwner);

router.post("/login",loginOwner);





router.get("/logout",logoutOwner);

// router.get("/addProducts",addProducts);






module.exports=router;