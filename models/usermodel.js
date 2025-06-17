const mongoose=require('mongoose');
const productmodel = require('./productmodel');



const userSchema=mongoose.mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true,

    },
    email:String,
    password:String,
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],
    
    orders:{
        type: Array,
        default:[],
    },
    address:String,
    contact:Number,
    picture:String

});

module.exports=mongoose.model("user",userSchema);