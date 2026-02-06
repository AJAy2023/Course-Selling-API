const express =  require("express");
const router  = express.Router();
const {
  createCourse ,getAllCourses, getBycourseId ,updateCourse,deletecourse} =  require("../controllers/courseController");
const verifyRoute = require("../middlewares/verifyuser");
const onlyTutor = require("../middlewares/onlyinstructor");


router.post('/create-course' ,verifyRoute,onlyTutor, createCourse);
router.get('/course/getAllCourses' ,verifyRoute, getAllCourses );
router.get('/course/:id' , verifyRoute,  getBycourseId);
router.patch('/course/:id' ,verifyRoute, updateCourse );
router.delete('/course/:id',verifyRoute ,deletecourse);





module.exports = router;

