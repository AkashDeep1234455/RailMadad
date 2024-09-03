import axios from "axios";

export const sendOtp = async ({ mobileNumber,setotptoken }) => {
  if (!mobileNumber) {
    console.log("mobile number not valid");
    return;
  }
  await axios
    .post("http://localhost:8080/sendOTP", { mobileNumber })
    .then((res) => {
        console.log(res.data.token);
        setotptoken(res.data.token);
    }).catch((err)=>{
        console.log("error is sending otp");
        console.log(err);
    });
};

export const verifyOtp = async ({otp,mobileNumber,token})=>{
  if(!otp||!mobileNumber||!token){
    if(!otp) console.log("otp not available");
    else if(!mobileNumber) console.log("mobile number not available");
    else console.log("token not available");
    return;
  }
  await axios.post("http://localhost:8080/verifyOTP",{otp,mobileNumber,token}).then((res)=>{
    console.log(res);
  }).catch((err)=>{
    console.log(err);
  })
}
