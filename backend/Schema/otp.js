const {Schema} = require("mongoose");
const OtpSchema = new Schema({
    otp:{
        type:String,
        required:true,
    },
    mobileNumber:{
        type:Number,
        required:true,
    },
    expirationTime:{
        type: Date,
        required: true,
    }
})
module.exports = {OtpSchema};