const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const postModel = require("./models/post");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { log } = require("console");

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

app.get("/profile",isLoggedIn,async(req,res)=>{
    const email = req.data.email;    
    let user = await userModel.findOne({email}).populate("posts");
    console.log(user);
    
    res.render("profile",{user:user});
})

app.post("/create",async(req,res)=>{
    const {username,email,password,age} = req.body;
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
                    age
                })
                let token = jwt.sign({email:email,id:user._id},"secret");
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
                let token = jwt.sign({email:email,id:data._id},"secret");
                res.cookie('token',token);
                res.redirect("/profile");
            }
            else{
            res.send('Incorrect Email/Password');
            }
        })
    }
})

app.post("/post",isLoggedIn,async(req,res)=>{
    const {content} = req.body;
    const user = await userModel.findOne({email:req.data.email});
    const post = await postModel.create({
        user : user._id,
        content,
    })
    user.posts.push(post._id)
    await user.save()
    res.redirect("/profile");
})

app.get("/logout",(req,res)=>{
    res.cookie('token', "");
    res.redirect("/");
})

function isLoggedIn(req,res,next){
    if(req.cookies.token === "") return res.send("You need to login")
    jwt.verify(req.cookies.token,"secret",(err,result)=>{
        req.data = result; 
    })
    next();
}

app.listen(3000);
