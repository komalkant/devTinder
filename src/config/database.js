const mongoose = require("mongoose");

const serverURI = "mongodb+srv://NamasteKK:UG7vvo0PWgwJwfT7@namastenodekk.azvvm3z.mongodb.net/devTinder";

const connectDB = async () => {
       await mongoose.connect(serverURI);
}

module.exports=connectDB;