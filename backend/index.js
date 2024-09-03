///requiring .env
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

///acquiring express
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

///acquiring cors
const cors = require("cors");

///acquiring dbConnect to connect with database
const dbConnect = require("./config/dbConnect");

///acquiring parsers
const bodyParser = require("body-parser");


///usuing parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//using cors
app.use(cors());

//acquiring routs
const routes = require("./routes/Sevak")

app.get("/",()=>{
    console.log("hello");
})
app.use("/",routes);










///making backend run
app.listen(port,()=>{
    console.log("App listening on port", port);
  dbConnect();
})
  