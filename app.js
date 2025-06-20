const express=require('express');
const app=express();
const ownersRouter=require("./routes/ownersRouter")
const productsRouter=require("./routes/productsRouter")
const usersRouter=require("./routes/usersRouter")
const indexRouter=require("./routes/indexRouter")
const expressSession=require("express-session")
const flash=require("connect-flash")

require("dotenv").config();


const cookieParser=require("cookie-parser")
const path=require("path");

const db=require("./config/mongooseconnection");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// console.log(process.env.EXPRESS_SESSION_SECRET)

app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.use(flash())
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");


app.use("/",indexRouter);
app.use("/owners",ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);

app.get("/",function(req,res){
    res.render("index");
})

app.listen(3003); 