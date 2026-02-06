const User =  require("../models/user");
const validator =  require("email-validator");
const bcrypt =  require("bcrypt");
const {generateAccesstoken , generateRefreshtoken}  = require("../utilites/token");

const register =  async (req, res)=>{
    try
    {
        const {username,  email, password} = req.body;
        if(!username ||  !email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"Add the required fields"
            });
        }
        if(!validator.validate(email))
        {
            return res.status(400).json({
                success:false,
                message:"Enter correct email formate"
            });
        } 
        const  user =  await User.findOne({email});
        if(user)
        {
            return res.status(409).json({
                success:false,
                message:"Email id  already exist. Please  do  login"
            });
        }
        const hashpassword  =  await bcrypt.hash(password , 10);
        const newUser =  await User.create({
            username,
            email,
            password:hashpassword
        });
        return res.status(201).json({
            success:true,
            message:"User created successfully",
            data:{
                username:newUser.username,
                email:newUser.email,
                role:newUser.role
            }
        });
    }catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        });
    }
}

const login  =  async (req, res)=>{
    try
    {
        const { email, password} =  req.body;
        // validation  
        if( !email || !password || !validator.validate(email))
        {
            return res.status(400).json({
                success:false,
                message:"Please fill all the  required fields|| Please check the  email formate"
            });
        }
        //  check  user exist or  not  
        const  existingUser  =  await User.findOne({email});
        if(!existingUser)
        {
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }
        // if  found match the  password  
        const isMatch = await bcrypt.compare(password ,  existingUser.password);
        if(!isMatch)
        {
            return res.status(401).json({
                success:false,
                message:"Please check the  password"
            });
        }
         const payload = {
                _id:existingUser._id,
                role:existingUser.role
            }
        // generate the token  
        const accessToken  =  generateAccesstoken(payload);
        const refreshtoken  =  generateRefreshtoken(payload);

         existingUser.isVerified = true
         existingUser.refreshtoken = refreshtoken
          await existingUser.save();

        res.cookie("refreshToken", refreshtoken, {
            httpOnly:true,
            secure:false,
            sameSite: 'Strict',
            MaxAge:10 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({
            success:true,
            message:'user  logIn successfully',
            accessToken
        });
    }catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:err.message
        });
    }
}



module.exports = {register, login};