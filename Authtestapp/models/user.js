const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/authtestapp`);

const userSchema = mongoose.Schema({
    username: String,
    email : String,
    password: String,
    age:Number,
    profilepic:{
        type:String,
        default: "default.jpg"
    },
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;