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

const userAuth = (req, res, next) => {
    const token = "komalkk";
    const isAuthenticated = token === "komalkk";
    if(!isAuthenticated){
        res.send("not authenticated");
    } else {
        console.log("user is authenticated");
        next();
    }
}

module.exports = {
    authAdmin,
    userAuth
}