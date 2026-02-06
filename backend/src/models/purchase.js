const  mongoose  = require("mongoose");

const  purchasecourseSchema  =  new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    },
}, {timestamps:true});

purchasecourseSchema.index({userId : 1 ,  courseId : 1},{unique:true});

module.exports = mongoose.model("Purchase", purchasecourseSchema);


