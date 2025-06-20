const express=require('express');
const router=express.Router();
const upload=require("../config/multerconfig");
const productModel=require("../models/productmodel")

router.post("/create",upload.single("image"),async function(req,res){
try{
    let {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;

    let product=await productModel.create({
         image:req.file.buffer,
         name,
         price,
        discount,

        bgcolor,
        panelcolor,
        textcolor,

    })
    
    req.flash("success","Product created successfully.");
    res.redirect("/products/shop");

    }
    catch(err){
        res.send(err.message)
    }

})
router.get("/shop",async function(req,res){
    const product=await productModel.find();

    res.render("shop",{product,owner:true})
})

module.exports=router;