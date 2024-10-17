const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const postModel = require("./models/post");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const upload1 = require("./utils/dp");
const upload2 = require("./utils/posts");
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

app.get("/like/:id",isLoggedIn,async(req,res)=>{
    let post = await postModel.findOne({_id:req.params.id});
    if(post.likes.indexOf(req.user.id) === -1){
        post.likes.push(req.user.id);
    }else{
        post.likes.splice(post.likes.indexOf(req.user.id));
    }
    await post.save();
    res.redirect("/profile");
})

app.get("/profile", isLoggedIn, async(req,res)=>{
    const email = req.user.email;  
    let user = await userModel.findOne({email}).populate("posts");
    res.render("profile",{user:user});
})

app.get("/dp",isLoggedIn,(req,res)=>{
    res.render("dp");
})

app.get("/edit/:id", isLoggedIn, async(req,res)=>{
    const email = req.user.email;  
    let post = await postModel.findOne({_id:req.params.id});
    res.render("edit",{post});
})

app.get("/logout",(req,res)=>{
    res.cookie('token', "");
    res.redirect("/");
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
                    age,
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

app.post("/uploadprofile", isLoggedIn, upload1.single("dp"), async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
    user.profilepic = req.file.filename;
    await user.save();
    res.redirect("/profile");
})

app.post("/post",isLoggedIn, upload2.single('image'),async(req,res)=>{
    const {content} = req.body;
    const user = await userModel.findOne({email:req.user.email});
    const post = await postModel.create({
        user : user._id,
        post:req.file.filename,
        content,
    })
    user.posts.push(post._id)
    await user.save()
    res.redirect("/profile");
})

app.post("/update/:id",isLoggedIn,async(req,res)=>{
    await postModel.findOneAndUpdate({_id:req.params.id},{content:req.body.content})
    res.redirect("/profile");
})



function isLoggedIn(req,res,next){
    if(req.cookies.token === "" || !req.cookies.token) return res.redirect("/login");
    jwt.verify(req.cookies.token,"secret",(err,result)=>{
        req.user = result; 
    })
    next();
}

app.listen(3000);
