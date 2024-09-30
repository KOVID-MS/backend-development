const express = require('express')
const app = express()

app.use((req,res,next)=>{
    console.log("Middleware called");
    next();
})

app.get('/',(req,res,next)=>{
    res.send("This is my first page")
})

app.get('/second',(req,res,next)=>{
    res.send("This is my second page")
})

app.get("/error",(req,res,next)=>{
    return next(new Error("Error captured"))
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Something Broke")
    next()    
})

app.listen(3000,(req,res)=>{
    console.log("Port connected successfully");
})