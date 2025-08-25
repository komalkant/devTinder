const express = require('express');

const app = express();

app.use("/hello",(req, res) => {
    res.send("Hello from nodemon ");
})

app.use("/",(req, res) => {
    res.send("Hello from Root get request");
})

app.use("/test", (req, res) => {
    res.send("Hello from Server");
})

app.listen(5151, () => {
    console.log("server is Successfully running on the 5151 Port");
});