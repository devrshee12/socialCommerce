
const User = require("../models/User");
const {verifyToken} = require("../utils")

const checkUserExists = async(req, res, next) => {
    try{
        const {email} = req.body;
        const user = await User.findOne({email});
        if(user){
            throw new Error("User Already Exists");
        }
        else{
            next();
        }
    }
    catch(err){
        return res.status(500).json({valid: false, msg:err.message});
        
    }
}


const authorization = (req, res, next) => {
    try{
        const token = req?.headers?.authorization;
        console.log("token is : ", token);
        if(!token){
            throw new Error("Token not found");
        }
        const payload = verifyToken(token);
        console.log("payload is : ", payload);
        if(!payload){
            throw new Error("Token in not valid");
        }
        req.user = payload;
        next();
    }
    catch(err){
        console.log("here in authhhhh : ", err.message);
        return res.status(500).json({valid: false, msg:err.message});

    }
}








module.exports = {
    checkUserExists,
    authorization
    
}