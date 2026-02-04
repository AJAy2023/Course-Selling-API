const  mongoose =  require("mongoose");
const  lessionSchema  = new  mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    courseId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
}, {timestamps:true});

module.exports= mongoose.model("Lession",  lessionSchema);