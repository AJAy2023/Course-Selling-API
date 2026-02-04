const  mongoose   = require("mongoose");

const userSchema  = new  mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:10,
        maxLength:100,
    },
    role:{
        type:String,
        required:true,
        enum:['student','instructor'],
        default:'student'
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    refreshtoken:{
        type:String,
        default:''
    },
    createdAt:{
        type:Date
    }
}, {timestamps:true});


module.exports = mongoose.model("User", userSchema);