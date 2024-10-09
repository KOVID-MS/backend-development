const express = require("express");
const path = require('path');
const app = express();
const userModel = require("./models/user")
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/edit/:id",async(req,res)=>{
    const data = await userModel.findOne({_id:req.params.id})
    res.render("edit",{data:data})
})

app.get("/read",async(req,res)=>{
    const users  = await userModel.find();
    res.render("read",{users})
})

app.get("/delete/:id",async(req,res)=>{
    const users  = await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read")
})

app.post("/update/:id",async(req,res)=>{
    const {name,email,image} = req.body;
    const data = await userModel.findOneAndUpdate({_id:req.params.id},{
        name,
        email,
        image
    });
    res.redirect('/read')
})

app.post("/create",async(req,res)=>{
    const {name,email,image} = req.body;
    const data = await userModel.create({
        name,
        email,
        image
    });

    res.redirect('/read')
})
app.listen(3000,()=>{
    console.log("Port connected successfully");
})