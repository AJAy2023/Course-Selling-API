const  mongoose  = require("mongoose");

const  purchasecourseSchema  =  new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }
}, {timestamps:true});

module.exports = mongoose.model("Purchase", purchasecourseSchema);


