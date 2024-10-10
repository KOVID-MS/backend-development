const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const jwt = require("jsonwebtoken");
const alert = require('alert');
const cookieParser = require("cookie-parser");

app.set('view engine','ejs');
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/",(req,res)=>{
    res.render('register');
})

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/profile",(req,res)=>{
    res.render("profile");
})

app.post("/create",async(req,res)=>{
    const {username,email,password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        res.send("Something went wrong");
    }
    else{
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,async (err,hash)=>{
                let user = await userModel.create({
                    username,
                    email,
                    password : hash,
                })
                let token = jwt.sign(email,"secret");
                res.cookie('token',token);
                res.redirect("/profile");
            })
        })
    }
    
})

app.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    const data = await userModel.findOne({email});
    if(!data) {
        res.send('Incorrect Email/Password');
    }
    else{
        bcrypt.compare(password,data.password,(err,result)=>{
            if(result){
                let token = jwt.sign(email,"secret");
                res.cookie('token',token);
                res.redirect("/profile");
            }
            else{
            res.send('Incorrect Email/Password');
            }
        })
    }
})

app.get("/logout",(req,res)=>{
    res.cookie('token', "");
    res.redirect("/");
})

app.listen(3000);
