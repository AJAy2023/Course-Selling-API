const mongoose  =  require("mongoose");
const Course =  require("../models/course");
const Purchase =  require("../models/purchase");
const User =  require("../models/user");

const coursePurchase  =  async (req, res)=>{
    try
    {
         const userid   = req.user._id;
         const {id} = req.params;  
        if(!mongoose.Types.ObjectId.isValid(id))
        {
            return res.status(400).json({
                success:false,
                message:'Please check the course id'
            });
        }

        const course  =  await Course.findById(id);
        if(!course)
        {
            return res.status(404).json({
                success:false,
                message:'course  not  found'
            });
        }

        const  user  = await User.findById(userid);

        if(user.role == 'instructor')
        {
            return res.status(200).json({
                success:true,
                message:'featched course data',
                data:course
            });
        }
        

        const isPurchased  =  await Purchase.find({
            userId:userid, 
            courseId:id
        });
    
        if(isPurchased.length > 0) 
        {
            return res.status(400).json({
                success: false,
                message: "Course already purchased"
            });
        } 
        const purchase =  await Purchase.create({
            userId: userid, 
            courseId:id
        });
            return res.status(201).json({
                success: true,
                message: "Course purchased successfully",
                data: purchase
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

const getUserPurchaseCourses =  async(req, res)=>{
    try
    {

        const {id} =  req.params; 
        if(!mongoose.Types.ObjectId.isValid(id))
        {   
            return res.status(404).json({
                success:false,
                message:"Please check the  userId"
            });
        }
        const courses = await Purchase.find({userId:id}).populate("courseId");
        if(courses.length == 0)
        {
             return res.status(404).json({
                success:false,
                message:"course not found",
                data:[]
            });
        }
        return res.status(200).json({
            success:true,
            message:"View all the  purchesed courses",
            data:courses
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



module.exports   = {coursePurchase, getUserPurchaseCourses}




