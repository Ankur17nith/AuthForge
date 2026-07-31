require("dotenv").config({path: ".../.env"})
const jwt = require('jsonwebtoken');

function setToken(user){
    return jwt.sign({
        _id:user._id,

    },process.env.JWT_SECRET,
    {expiresIn: 7*24*60*60*1000})
}

function getToken(token){
    if(!token) return null;
    try {
        return jwt.verify(token,process.env.JWT_SECRET )
    } catch (error) {
        return null;
    }
}

module.exports= {
    setToken,
    getToken
}