const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const userName = req.headers.username;
    const password = req.headers.password;

    
    async function getpass(userName){
        const response=  await User.findOne({"userName": userName});
        return response;
    }
    
    const actpass = await getpass(userName);

    if(actpass.password == password){
        next();
    }
    else{
        res.status(403).send("UserName or Password Invalid!!!")
    }
}

module.exports = userMiddleware;