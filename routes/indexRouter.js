const express=require('express');
const router=express.Router();
const isLoggedIn=require("../middlewares/isLoggedIn")

const productmodel = require('../models/productmodel');
const usermodel = require('../models/usermodel');


router.get("/",function(req,res){
    let error=req.flash("error");
    res.render("index",{error,loggedin:false});
})

router.get("/shop",isLoggedIn,async function(req,res){
    let product=await productmodel.find();
    let success=req.flash("success");


    res.render("shop",{product,success});
})

router.get("/cart",isLoggedIn,async function(req,res){
    
    let user=await usermodel.findOne({email:req.user.email}).populate("cart");
    console.log(user)
    res.render("cart",{user}); 
})

router.get("/profile",isLoggedIn,async function(req,res){
    
    let user=await usermodel.findOne({email:req.user.email}).populate("cart");
    
    res.render("profile",{user}); 
})

router.get("/addtocart/:productid",isLoggedIn,async function(req,res){
    let user= await usermodel.findOne({email:req.user.email});
    console.log(user)
    user.cart.push(req.params.productid);
    await user.save();

    req.flash("success","Added to cart");
    res.redirect("/shop");
})

module.exports=router;
