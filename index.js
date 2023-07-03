const express=require("express");
const path=require("path");
const app=express();
const port=process.env.PORT||8000;
const dotenv=require("dotenv");
dotenv.config();
const mongoose=require("mongoose");
mongoose.set("strictQuery", false);
const DATABASE_URL= process.env.DATABASE_URL;
console.log("hit 1 check");
console.log(DATABASE_URL)
const connectdb=require("./database/database.js");
connectdb(DATABASE_URL);
const cors=require("cors");
app.use(express.json());// to parse the json files
app.use(cors()); // to allow cross origin resource sharing

// routes require
const homeRoute=require("./routes/index");

app.use("/",homeRoute);

app.use("",(req,res)=>{ // for useless links
    res.send("error 404");
});
app.listen(port,(error)=>{
    if(error){
        console.log("error in starting the server");
    }else{
        console.log("server started", port);
    }
})