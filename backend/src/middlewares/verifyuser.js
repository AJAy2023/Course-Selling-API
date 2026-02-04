const User =  require("../models/user");
const  bcrypt = require("bcrypt");
const jwt  =  require("jsonwebtoken");
require("dotenv").config();
const verifyRoute = async (req, res , next)=>{
    try
    {
        const headertoken  =  req.headers?.authorization;
        
        if(!headertoken || !headertoken.startsWith("Bearer ")){
            return res.status(401).json({
                success:false,
                message:"token  not  found || Aunathorized access"
            });
        }
        const token  =  headertoken.split(" ")[1];
        if(!token)
        {
            return res.status(404).json({
                success:false,
                message:'token not found'
            });
        }
         const decode  =  jwt.verify(token ,  process.env.JWT__TOKEN);
        const user  =  await User.findById(decode._id);
        if(!user)
        {
            return res.status(404).json({
                success:false,
                message:"user not  found"
            });
        }
        req.user = user
       next();
    }catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:err.message
        });
    }
} 



module.exports = verifyRoute;