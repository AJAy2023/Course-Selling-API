const Course =  require("../models/course");
const Lession =  require("../models/lessions");
// add lession  
const  addLession  =  async (req, res)=>{
    try
    {
         const {id} =  req.params; 
        const {title,  content} =  req.body;

        if(!title|| !content)
        {
            return res.status(400).json({
                success:false,
                message:"Please add both title and content"
            });
        }
        //  find teh  course  
        const findCourse =  await Course.findById(id);
        if(!findCourse)
        {
            return res.status(404).json({
                success:false,
                message:"course not  found"
            });
        }
        // create the  lession  
        const  newLession = await Lession.create({
            title,
            content,
            courseId:findCourse._id
        });

        return res.status(201).json({
            success:true,
            message:"lession created successfully",
            data:newLession
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


const getcourseLessions =  async (req, res)=>{
    try
    {
        const {courseId} =  req.params;
        // find the  course  
        const  course =  await  Course.findById(courseId).select("title description");
        if(!course)
        {
            return res.status(404).json({
                success:false,
                message:'Course  not  found'
            });
        }
        //  find the  lessions 
        const lessions  =  await  Lession.find({courseId});
            if(lessions.length == 0)
            {
                return res.status(400).json({
                    success:false,
                    message:'lession not  found',
                    data:[]
                });
            }

        // yes then return 
        return res.status(200).json({
            success:true,
            message:"Lession featched successfully",
            data:{
                course,
                lessions
            }
        });

    }catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        });
    }
}

module.exports = {addLession , getcourseLessions}