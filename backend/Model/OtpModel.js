const {OtpSchema} = require("../Schema/otp");
const {model} = require("mongoose");

const OtpModel = new model("Otp",OtpSchema);
module.exports = {OtpModel};