const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const CookieParser = require("cookie-parser");

app.use(CookieParser());

app.get("/",(req,res)=>{
    const token = jwt.sign({name:"harsh"},"secret");
    res.cookie("token",token);
    res.send("home");
    
})

app.get("/jwt",(req,res)=>{
    const data = jwt.verify(req.cookies.token,"secret");
    res.send("jwt compare");
    console.log(data);
})

app.get("/read",(req,res)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash("hello",salt,(err,hash)=>{
            res.send("bcrypt hash");
            console.log(hash);
        })
    }) 
})

app.get("/compare",(req,res)=>{
    bcrypt.compare("hello","$2b$10$UXylh3qas2sFJ5REGa3VsOuEl8MDrKd2yI9HIoU8qmV13DMeKFGpu",(err,result)=>{
        res.send("bcrypt compare");
        console.log(result);
    })
})

app.listen(3000);