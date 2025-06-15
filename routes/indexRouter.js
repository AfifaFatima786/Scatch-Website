const express=require('express');
const router=express.Router();
const isLoggedIn=require("../middlewares/isLoggedIn")

const productmodel = require('../models/productmodel');


router.get("/",function(req,res){
    let error=req.flash("error");
    res.render("index",{error});
})

router.get("/shop",async function(req,res){
    let product=await productmodel.find();

    res.render("shop",{product});
})

module.exports=router;
