const multer = require("multer");
const path = require("path");
const postModel = require("../models/post");
const userModel = require("../models/user");

const storage2 = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname, "../public/images/uploads"));
    },
    filename:async(req,file,cb)=>{
        const postcount = await postModel.find({user:req.user.id}).countDocuments() + 1;
        const user = await userModel.findOne({email:req.user.email});
        cb(null, user.username + "_post" + postcount + path.extname(file.originalname));
    }
})

const upload2 = multer({storage:storage2})

module.exports = upload2;