if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

const mongoose = require("mongoose");
const mongoURL = process.env.MONGODB_URL;


function dbConnect(){
    mongoose.connect(mongoURL).then(()=>{
        console.log("DBConnected");
    })
    .catch((err)=>{
        console.log("you are facing db connection error");
    })
}

module.exports = dbConnect;