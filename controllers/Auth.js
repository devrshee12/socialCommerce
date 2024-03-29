const Cart = require("../models/Cart");
const User = require("../models/User");

const {generateToken} = require("../utils")


const register = async(req, res) => {
    try{
        // console.log(req.body);
        const user = await User.create(req.body) 
        const token = generateToken({userId: user._id, role: user.role})

        await Cart.create({userId : user._id, products: []});
        return res.status(200).json({valid: true, msg:"User has been created", token, user});
    }
    catch(err){
        console.log("error is : ", err.message);
        return res.status(500).json({valid: false, msg:err.message});
    }
}


const login = async(req, res) => {
    try{
        const {email, password} = req.body; 
        const user = await User.findOne({email});

        if(!user){
            throw new Error("User does not exists");
        }

        if(user.password !== password){
            throw new Error("Password is incorrect");
        }   

        const token = generateToken({userId: user._id, role: user.role});

        return res.status(200).json({valid: true, msg:"User logged in", token, user});            
        
    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({valid: false, msg:err.message});
    }
}



const verifyUser = async(req, res) => {
    try{
        console.log("verify user called ");
        const {userId} = req.user;
        const user = await User.findOne({_id:userId});
        console.log("veroyasd user is : ", user);
        return res.status(200).json({valid: true, msg:"User logged in", user});
    }   
    catch(err){
        console.log("here in verify user error");   
        console.log(err.message);
        return res.status(500).json({valid: false, msg:err.message});
    }
}




module.exports = {
    register,
    login,
    verifyUser
    
}