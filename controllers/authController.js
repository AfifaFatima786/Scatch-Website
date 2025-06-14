const userModel=require("../models/usermodel")
const bcrypt =require("bcrypt");
const jwt=require("jsonwebtoken");
const { generateToken }=require("../utils/generateToken")


module.exports.registerUser=async function(req,res){              
    

    try{
    let {email,password,fullname}=req.body;

    let users=await userModel.findOne({email});
    if(users){
     req.flash("error","User already registered");
     return res.redirect("/");
    } 

    bcrypt.hash(password,10,async function(err,hash){
        if(err) return res.send(err.message)
        else{
            let user=await userModel.create({
        email,
        password:hash,
        fullname
    });
        let token=generateToken(user);
        res.cookie("token",token);
        res.redirect("/shop");
    }
    })
}

catch(err){
    console.log(err.message);
}
    
}

module.exports.loginUser=async function(req,res){
    let {email,password}=req.body;

    const user=await userModel.findOne({email})
    if(!user) {
    req.flash("error","Email or Password incorrect");
     return res.redirect("/");
    }
    
    bcrypt.compare(password,user.password,function(err,result){

    if(!result)  
    {    
    req.flash("error","Email or Password incorrect");
    return res.redirect("/");
    }
    else{
    let token=generateToken(user);
    res.cookie("token",token);
    res.redirect("/shop");

    }
    })

}


module.exports.logoutUser=async function(req,res){
    res.clearCookie("token");
    res.redirect("/")

}