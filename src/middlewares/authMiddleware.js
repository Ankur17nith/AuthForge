const {getToken}= require('../utils/generateToken');
const User= require('../models/user')

const protect = async (req, res, next)=>{
    let token;

    if(req.cookie && req.cookie.token){
        token = req.cookie.token;
    }
    else if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token= req.headers.authorization.split(' ')[1];
    }

    if(!token){
        res.status(400).json({
            success:true,
            message:"Not Authorized, No Token Found!"
        })
    }

    try {
        const decoded= getToken(token);

        if(!decoded){
            returnres.status(401).json({
                success:false,
                message:"User No Longer Exist"
            })
        }

        const user= User.findById(decoded._id)

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User no longer Exists"
            })
        }

        req.user= user;
        next();
    } catch (error) {
        console.error("Error" ,error)
        res.status(400).json({
            success:false,
            message:"Invalid or expired token"
        })
    }
}

module.exports= {protect};