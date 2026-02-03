const express =  require("express");
const app  = express();
require("dotenv").config();
const PORT =  process.env.PORT || 6000;


app.use(express.json());

app.get('/', (req, res)=>{
    res.status(200).json({
        success:true,
        message:"hello world!"
    });
})


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