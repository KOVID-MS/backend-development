const express = require("express");
const app = express();

const userModel = require('./usermodel');

app.get('/create',async(req,res)=>{
    const data = await userModel.create({
        name:"Srujana",
        email:"srujana@gmail.com",
        username:"Srujana",
    })
    res.send(data);
})

app.get('/read',async(req,res)=>{
    const data = await userModel.find();    
    res.send(data);
})

app.get('/update',async(req,res)=>{
    const data = await userModel.findOneAndUpdate({username:"Kovid"},{email:"kovidmsk@gmail.com"},{new:true});
    res.send(data);
})

app.get('/delete',async(req,res)=>{
    const data = await userModel.findOneAndDelete({username:"Srujana"});
    res.send(data);
})

app.listen(3000,()=>{
    console.log("Port connected");
    
})