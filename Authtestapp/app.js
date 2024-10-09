const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");

app.set('view engine','ejs');
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/",(req,res)=>{
    res.render('home')
})

app.post("/create",(req,res)=>{
    const {username,email,password} = req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            let user = await userModel.create({
                username,
                email,
                password : hash,
            })
            let token = jwt.sign(email,"secret");
            res.cookie('token',token);
            res.send(user);
        })
    })
})

app.get("/logout",(req,res)=>{
    res.cookie('token', "");
    res.render("home");
})

app.listen(3000)