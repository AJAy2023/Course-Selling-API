const express =  require("express");
const router = express.Router();
const {register , login} = require("../controllers/authController");
const verifyRoute = require("../middlewares/verifyuser");
const onlyTutor =  require ("../middlewares/onlyinstructor");


router.post('/register', register);
router.post('/login', login)


router.get('/me', verifyRoute , onlyTutor, (req, res)=>{
    res.send("i have an token and i am  verfied route");
})


module.exports = router