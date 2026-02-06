const User = require("../models/user");

const  onlyTutor  = async (req, res, next)=>{
    try
    {
       const user = req.user;
         if (!user || user.role !== "instructor" ) {
      return res.status(403).send({error: { status:403, message:'Access denied.'}});
    }
        next();
    }catch(err)
    {
        return  res.status(500).json({
            success:false,
            message:'Internal server error',
            error:err.message
        });
    }
}


module.exports = onlyTutor