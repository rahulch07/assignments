const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const userName = req.headers.username;
    const password = req.headers.password;

    
    async function getpass(username){
        
        return await Admin.findOne({"username": "rahul"});
    }
    
    const actpass = await getpass(userName);
    //console.log(actpass);

    if(actpass.password == password){
        next();
    }
    else{
        res.status(403).send("UserName or Password Invalid!!!")
    }
}

module.exports = adminMiddleware;