const express = require("express")
const router = express.Router();
const {addLession , getcourseLessions} = require("../controllers/lessionController");
const verifyRoute =  require("../middlewares/verifyuser");
const onlyTutor =  require("../middlewares/onlyinstructor");

router.post('/addlessions/:id' , verifyRoute , onlyTutor, addLession);
router.get('/courselessions/:id',verifyRoute , getcourseLessions);


module.exports = router;
