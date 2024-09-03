const {sendOTP,verifyOTP} = require("../controller/otp")
const router = require('express').Router();


router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);


module.exports = router;