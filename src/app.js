const express = require('express');

const app = express();

app.get("/user", (req, res) => {
    // Params
    // console.log(req.params);
    // query
    // console.log(req.query);
    res.send({firstName: 'komalkant', lastName: 'Gupta'})
})

app.post("/user", (req, res) => {
    console.log("Data saved succesfully");
    res.send("saved");
})

app.patch("/user", (req, res) => {
    console.log("Data Updated succesfully with patch");
})

app.put("/user", (req, res) => {
    console.log("Data Updated succesfully with put");
})

app.delete("/user", (req, res) => {
    console.log("Data Deleted");
    res.send("data deleted");
})

app.use("/hello/23",(req, res) => {
    res.send("Hello from hello Route/23 ");
})

app.use("/hello",(req, res) => {
    res.send("Hello from hello route ");
})

app.use("/test", (req, res) => {
    res.send("Hello from Server");
})

// app.use("/",(req, res) => {
//     res.send("Hello from Root get request");
// })

app.listen(5151, () => {
    console.log("server is Successfully running on the 5151 Port");
});