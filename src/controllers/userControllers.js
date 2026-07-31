const User = require('../models/user');
const {setToken}= require('../utils/generateToken')

async function handleUserRegister(req, res, next){
    try {
        const {name, email, password}= req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please Provide Complete Credentials"
            })
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"Email Already Existed!"
            })
        }

        const user= await User.create({name,email,password});

        const token= setToken(user);

        res.cookie('token',token,{
            httpOnly:true,
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({
            success:true,
            message:"Account Created"
        })
    } catch (error) {
        console.error("Register Error",error)
        return res.status(500).json({
            success:false,
            message:"Server Error during Registration"
        })
    }

}

async function handleUserLogin(req, res, next){
    try {
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "Please provide Complete Credentials"
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Not Found!"
            })
        }

        const isMatch= await user.comparePassword(password);

        if(!isMatch){
            return res.status(404).json({
                success:false,
                message:"Incorrect Password"
            })
        }

        const token= setToken(user);

        res.cookie('token',token,{
            httpOnly:true,
            maxAge: 7*24*60*60*1000
        })

        return res.status(200).json({
            success:true,
            user:{
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Error", error)
        return res.status(500).json({
            success:false,
            messsage:"Server Error during Login"
        })
    }
}

async function handleUserLogout(req, res){
    res.cookie('token','',{
        httpOnly:true,
        expires:new Date(0)
    })
    return res.status(200).json({
        success: true,
        message:"Logout Succesfully"
    })
}


module.exports ={
    handleUserRegister,
    handleUserLogin,
    handleUserLogout
}