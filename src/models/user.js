const mongoose = require("mongoose");
const validate = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    lastName: {
        type: String,
        minLength: 5,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validate.isEmail(value)){
                throw new Error("Please Enter a valid EmailId");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validate.isStrongPassword(value)){
                throw new Error("Please Enter a valid EmailId");
            }
        }
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