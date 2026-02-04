const mongoose = require("mongoose");
require("dotenv").config({path:(__dirname, "../.env")});


const connectDB =  async()=>{
    try
    {
        await mongoose.connect(process.env.MONGO_URL);
            console.log("mongo db connected...");
    }catch(err)
    {
        console.log("mongo db dissconnected");
        console.error(err);
    }
}


module.exports = connectDB