const ownerModel=require("../models/ownermodel")
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken");
const { generateToken }=require("../utils/generateToken")
const productmodel = require('../models/productmodel');


module.exports.registerOwner=async function(req,res){              
    

    try{
    let {email,password,fullname}=req.body;
    let product=await productmodel.find();

    let owner=await ownerModel.findOne({email});
    if(owner){
     req.flash("error","Owner already registered");
     return res.redirect("/");
    } 

    bcrypt.hash(password,10,async function(err,hash){
        if(err) return res.send(err.message)
        else{
            let owner=await ownerModel.create({
        email,
        password:hash,
        fullname
    });
        let token=generateToken(owner);
        res.cookie("token",token);
        res.render("shop",{product,owner:true});
    }
    })
}

catch(err){
    console.log(err.message);
}
    
}

module.exports.loginOwner=async function(req,res){
    let {email,password}=req.body;

    let product=await productmodel.find();


    const owner=await ownerModel.findOne({email})
    if(!owner) {
    req.flash("error","Email or Password incorrect");
     return res.redirect("/");
    }
    
    bcrypt.compare(password,owner.password,function(err,result){

    if(!result)  
    {    
    req.flash("error","Email or Password incorrect");
    return res.redirect("/");
    }
    else{
    let token=generateToken(owner);
    res.cookie("token",token);
    res.render("shop",{product,owner:true});

    }
    })

}


module.exports.logoutOwner=async function(req,res){
    res.clearCookie("token");
    res.redirect("/")

}


// module.exports.addProducts=async function(req,res){
//     res.render("createproducts",{owner:true});

// }




