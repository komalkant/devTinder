const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim:true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Wrong gender provided");
            }
        }
    },
    age: {
        type:Number,
        min: 18
    },
    photoUrl: {
        type:String,
        default: "profilepic.jpg"
    },
    about: {
        type: String,
        default: "This the default about of the user"
    },
    skills: {
        type: [String]
    }
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);