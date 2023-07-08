const express=require("express");
const { verifyToken,verifyTokenAndAuthorise } = require("./verifyToken");
const router=express.Router();
const User=require("../models/User.js");
const bcrypt=require("bcrypt");
// use verifyTokenAndAuthorise when user id is needed for the operation ex crud
// use verifyToken for only simple acess with jwt token
router.get("/",verifyToken,(req,res)=>{
    res.send("this is user page");
});

router.get("/",verifyToken,(req,res)=>{
    res.send("this is user page");
});

router.get("/getAll", verifyToken, (req, res) => {
    User.find().then((data, err) => {
        if (err) {
          console.error('Error fetching table data:', err);
          res.status(500).send('Internal Server Error');
        } else {
          res.send(data);
        }
      });
});


// get user profile data (except password)
router.get("/myprofile",verifyToken,async (req,res)=>{
    // show user data
    try{
        id=await req.user._id; // getting id form the jwt encryption
        
       const user=await User.findById(id);
       if(!user){
           res.status(200).json({ success: false, message: "user not found" });
       }else{
           
          
           const {password,...others}=user._doc;
           res.status(200).json({...others});
       }
        }catch (e){
            
            res.status(500).json({ success: false, message: "server data not found" });
        }
});
    

    // additional Details test
// router.patch ("/myprofile/additionalDetails",verifyToken,(req,res)=>{
//     id= req.user._id;
    
    
//         User.findByIdAndUpdate(id,{
//             // additionalDetails:req.body
//             ...others=details
//         }).then((user)=>{
//             var phoneNumber=user.additionalDetails[0]['codeChefProfile']
//             console.log(phoneNumber);
//             res.status(200).json("additional Details added Success");
//         }).catch((error)=>{
//             console.log(error);
//             res.status(500).json("additional Details not added Success");

//         });
// });

router.get("/test/:id",verifyTokenAndAuthorise,(req,res)=>{
    res.send("hello");
});
router.get("/userTest",(req,res)=>{
    res.send("this is user test");
})
router.post("/userTest",(req,res)=>{
   const name=req.body.name;
   res.send("the name is"+name);
})
module.exports=router;