const express = require('express')
const app = express()
const path = require('path')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get("/welcome/:name",(req,res)=>{
    res.send(`Welcome, ${req.params.name }</br>  hello`)
    res.send('hello')
})

app.get("/author/:name/:age",(req,res)=>{
    res.send(`Welcome, ${req.params.name}, </br> Your age is ${req.params.age}`)
})

app.listen(3000,()=>{
    console.log("Port connected successfully");
})
