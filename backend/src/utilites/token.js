const  jwt  = require("jsonwebtoken");
require("dotenv").config();

function generateAccesstoken(user)
{
    return jwt.sign({_id:user._id, role:user.role}
        ,process.env.JWT__TOKEN,
         {expiresIn:"5m"});
}

function generateRefreshtoken(user){
    return jwt.sign({_id:user._id, role:user.role}, process.env.REFRESH_TOKEN, {expiresIn:"10d"});
}



module.exports = {generateAccesstoken , generateRefreshtoken}