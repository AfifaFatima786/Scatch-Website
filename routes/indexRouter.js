const express=require('express');
const router=express.Router();
const isLoggedIn=require("../middlewares/isLoggedIn")
const productModel=require("../models/productmodel");
const productmodel = require('../models/productmodel');


router.get("/",function(req,res){
    let error=req.flash("error");
    res.render("index",{error});
})

router.get("/shop",isLoggedIn,async function(req,res){
    let product=await productmodel.find();

    res.render("shop",{product});
})

module.exports=router;
