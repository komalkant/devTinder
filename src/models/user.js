const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: this._id, email: this.email}, 'komalkant@123', {expiresIn: '7d'});
    return token;
}

userSchema.methods.validatePassword = async function(passwordByInputUser) {
    const user = this;
    const passwordHash = user.password;
    const isPaaseword = await bcrypt.compare(passwordByInputUser, passwordHash);
    return isPaaseword;
}

module.exports = mongoose.model("User", userSchema);