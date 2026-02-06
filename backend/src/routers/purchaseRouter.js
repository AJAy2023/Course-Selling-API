const express = require("express");
const router =  express.Router();
const {coursePurchase, getUserPurchaseCourses} = require("../controllers/purchaseController");
const verifyRoute = require("../middlewares/verifyuser");

router.post('/purchase/:id' , verifyRoute, coursePurchase);
router.get('/getpurchasecourses/:id',verifyRoute, getUserPurchaseCourses)


module.exports = router