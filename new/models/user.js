const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/new`);

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;

