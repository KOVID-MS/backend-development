const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/backendpractice`);

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    }
});

const usermodel = mongoose.model("user",userSchema);

module.exports = usermodel;