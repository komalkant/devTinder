const express = require('express');
const {authAdmin, userAuth} = require("./middlewares/auth");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

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


app.post("/signup", async (req, res) => {
try {
    console.log(req.body);
    const user = new User(req.body);
    await user.save();
    res.send("user added Succsefully!");
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