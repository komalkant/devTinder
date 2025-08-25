const express = require('express');

const app = express();

app.get("/user", (req, res, next) => {
    console.log("Route handler1")
    next();
    //res.send('response send') // if you passingg next() function then res.send only workin last rote handler
},[(req, res, next) => { // for multiple Route handler need to pass next() function
    console.log("Route handler2")
    next();
    // res.send('response send2')
},, (req, res, next) => { // for multiple Route handler need to pass next() function
    console.log("Route handler3")
    next();
    // res.send('response send2')
}], (req, res) => {
    console.log("Route handler4")
    res.send('response send4')
})

// app.post("/user", (req, res) => {
//     console.log("Data saved succesfully");
//     res.send("saved");
// })


// app.use("/",(req, res) => {
//     res.send("Hello from Root get request");
// })

const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

const cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

app.listen(5151, () => {
    console.log("server is Successfully running on the 5151 Port");
});