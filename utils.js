const jwt = require("jsonwebtoken");
const generateToken = (data, time="7d") => {
    const token = jwt.sign(data, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn:time
    })

    return token;
}


const verifyToken = (token) => {
    try{
        const decoded = jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET);
        return decoded

    }
    catch(err){
        return undefined;
    }
    
}

module.exports = {
    generateToken,
    verifyToken
    
}