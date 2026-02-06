const express =  require("express");
const app  = express();
require("dotenv").config();
const cookieparser = require("cookie-parser");
const authentication  =  require("./routers/authRouter");
const course =  require("./routers/courseRoute");
const lession = require("./routers/lessionRouter");
const purchase =  require("./routers/purchaseRouter");
const connectDB =  require("./config/db");


const PORT =  process.env.PORT || 6000;

connectDB();

app.use(express.json());
app.use(cookieparser());

app.get('/', (req, res)=>{
    res.status(200).json({
        success:true,
        message:"hello world!"
    });
})

app.use('/api' , authentication);
app.use('/api', course);
app.use('/api',lession);
app.use('/api', purchase);

app.use((req, res,  next)=>{
    const error = new Error("route not  found");
    error.status=400;
    next(error);    
})

app.use((err, req, res , next)=>{
      res.status(err.status ||500).json({
        success:false,
        message:'Internal server error',
        error:err.message
      });  
})
app.listen(PORT , ()=>{
    console.log(`the server is running  on the  port :${PORT}`);
})