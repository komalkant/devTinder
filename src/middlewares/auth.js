const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authAdmin = (req, res, next) => {
    const token = "komal";
    const isAuthenticated = token === "komal";
    if(!isAuthenticated){
        res.send("not authenticated");
    } else {
        console.log("Admin is authenticated");
        next();
    }
}

// const userAuth = (req, res, next) => {
//     const token = "komalkk";
//     const isAuthenticated = token === "komalkk";
//     if(!isAuthenticated){
//         res.send("not authenticated");
//     } else {
//         console.log("user is authenticated");
//         next();
//     }
// }

const userAuth= async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).send("Unauthorized: No token provided");
    }
    try {
        const decodedObj = jwt.verify(token, 'komalkant@123');
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("No user found");
        }

        req.user = user;
        next();
    } catch(err) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
}

module.exports = {
    authAdmin,
    userAuth
}