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

app.get("/user", userAuth, (req, res, next) => {
    console.log("Route handler1")
    // next();
    res.send('response send') // if you passingg next() function then res.send only workin last rote handler
})

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "kk",
        lastName: "Gupta1",
        email: "kk@outlook.com",
        password: "kk@123",
})
try {
    await user.save();
    res.send("user added Succsefully!");
} catch(err) {
    res.status(500).send("Error saving the error", err);
}

})