const multer = require("multer");
const path = require("path");
const userModel = require("../models/user");


const storage1 = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"../public/images/dps"));
    },
    filename:async(req,file,cb)=>{
        const user = await userModel.findOne({email:req.user.email});
        cb(null, user.username + path.extname(file.originalname));
    }
})

const upload1 = multer({storage:storage1});

module.exports = upload1;