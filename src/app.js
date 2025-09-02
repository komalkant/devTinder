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
    console.log(req.body);
    const user = new User(req.body);
try {
    await user.save();
    res.send("user added Succsefully!");
} catch(err) {
    res.status(500).send("Error saving the error", err);
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