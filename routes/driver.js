const express=require("express");
const { verifyToken,verifyTokenAndAuthorise } = require("./verifyToken");
const router=express.Router();
const Driver=require("../models/Driver.js");
const bcrypt=require("bcrypt");
// use verifyTokenAndAuthorise when user id is needed for the operation ex crud
// use verifyToken for only simple acess with jwt token


router.get("/",verifyToken,(req,res)=>{
    res.send("this is Driver page");
});

router.get("/getAll", verifyToken, (req, res) => {
    Driver.find().then((data, err) => {
      if (err) {
        console.error('Error fetching table data:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(data);
      }
    });
});


module.exports=router;