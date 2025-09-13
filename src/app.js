const express = require('express');
const {authAdmin, userAuth} = require("./middlewares/auth");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const validator = require("validator");
const jwt = require("jsonwebtoken");

connectDB()
.then(() => {
    console.log("database connection established....");
    app.listen(5151, () => {
    console.log("server is Successfully running on the 5151 Port");
});

}).catch((err) => {
    console.log("unable to connect");
})

app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req, res) => {
try {
    validateSignUpData(req.body);
    const {firstName, lastName, email, password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
        firstName,
        lastName,
        email,
        password: passwordHash
    });
    await user.save();
    res.send("user added Succsefully!");
} catch(err) {
    res.status(500).send("Error: " + err.message);
}
});

app.get("/profile", userAuth, async(req,res) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(404).send("No user found");
        }
        res.status(200).send(user);
    } catch(err) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
})

app.get("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.status(200).send(user.firstName + " " + user.lastName + " Connection request sent successfully");
    } 
        catch(err) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
})
app.post("/login", async (req,res) => {
    try {
        const {email, password} = req.body;
        if(!validator.isEmail(email)){
            throw new Error("Email must not be empty and must be valid email");
        }
        const findEmail = await User.findOne({email: email});
        if(!findEmail){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await User.validatePassword(password);
        if(isPasswordValid){
            const jwtToken = await User.getJWT();
            console.log("jwtToken", jwtToken);
            res.cookie("token", jwtToken, {
                expires: new Date(Date.now() + 25892000000),
            });
            res.status(200).send("Login Successfull");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch(err) {
        res.status(500).send("Error: " + err.message);
    }  
});

app.get("/user", async (req, res)=> {
    try {
        const email = req.body.email;
        const user = await User.find({email: email});
        if(user.length === 0){
            res.status(404).send("No user Found");
        }
        res.send(user);
    } catch(err){
        
    }

});

app.get("/feed", async (req, res)=>{
    try{
        const users = await User.find({});
        if(!users){
            res.status(500).send("No user Found");
        }
        res.status(200).send(users);
    } catch(err){
        res.status(400).send("Somthing wen Wrong", err);
    }
});

app.delete("/user", async (req, res) => {
    try {
    const userId = req.body.userId;
    const data = req.body;
    if(!userId) res.status(402).send("userId is empty");
    const deleteUser = await User.findOneAndDelete({_id: userId});
    console.log('deleteUser', deleteUser);
    res.status(200).send("user deleted succesfully");
    } catch (error){
        res.status(400).send("Something went Wrong", error);
    }
});

// update user
app.patch("/user/:userId", async (req, res) => {
    try {
    const userId = req.params?.userId;
    const data = req.body;
    // if(!userId) res.status(402).send("userId is empty");
    const Allowed_keys = ["photoUrl","age","gender","skills"];
    const isUpdateAllowed = Object.keys(data).every((k) => 
        Allowed_keys.includes(k)
    );
    if (!isUpdateAllowed) {
        throw new Error("Update not allowed");
    }
    if(data?.skills.length > 10){
        throw new Error("more then 10 skills not allowed");
    }
    const userUpdate = await User.findByIdAndUpdate({_id: userId}, data,{
        returnDocument: "after",
        runValidators: true
    });
    console.log('userUpdate', userUpdate);
    res.status(200).send("userUpdate");
    } catch (err){
        res.status(400).send("Wrong: " + err);
    }
})