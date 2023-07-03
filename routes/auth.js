const router=require("express").Router();
const User=require("../models/User.js");
const Driver=require("../models/Driver.js");

// const CryptoJS=require("crypto-js"); // not required to be removed at end
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

router.post("/register/driver",async(req,res)=>{
    
    Driver.findOne({email:req.body.email}).then(async(driver)=>{
        if(driver){
            res.status(200).json({ success: true, message: "driver exists" });
            // res.status(302).redirect("/api/auth/register");
        }else{
            const salt=await bcrypt.genSalt(10);
            const hashedPass=await bcrypt.hash(req.body.password,salt);
            // console.log(req.body.name);
            // console.log(req.body.email);

            // console.log(req.body.password);
            // console.log(req.body.type)
            
            Driver.create({
                name:req.body.name,
                email:req.body.email,
                password:hashedPass,
                mobileNumber:req.body.mobileNumber,
                gender:req.body.gender,
                vehicleNumber:req.body.vehicleNumber,
                vehicleType:req.body.vehicleType,
                rating:req.body.rating


                // ...others=req.body // spread operator to get other optional field data (will take data after the account creation (not working with hashed password))
            
                
            }).then((data)=>{
                res.status(200).json({ success: true, message: "Driver Created Success" }); // redirect here after the registration to login page
                console.log("Driver Created");
                console.log(data.createdAt);
            }).catch((error)=>{
                res.status(500).json(error);
                console.log("Inside error 1");
                console.log(error);
            })
        }
    })
});

router.post("/register/user",async(req,res)=>{
    
    User.findOne({email:req.body.email}).then(async(user)=>{
        if(user){
            res.status(200).json({ success: true, message: "user exists" });
            // res.status(302).redirect("/api/auth/register");
        }else{
            const salt=await bcrypt.genSalt(10);
            const hashedPass=await bcrypt.hash(req.body.password,salt);
            // console.log(req.body.name);
            // console.log(req.body.email);

            // console.log(req.body.password);
            // console.log(req.body.type)
            
            User.create({
                name:req.body.name,
                email:req.body.email,
                password:hashedPass,
                mobileNumber:req.body.mobileNumber,
                gender:req.body.gender,
                // ...others=req.body // spread operator to get other optional field data (will take data after the account creation (not working with hashed password))
                
                
            }).then((data)=>{
                res.status(200).json({ success: true, message: "User Created Success" }); // redirect here after the registration to login page
                console.log("User Created");
                console.log(data.createdAt);
            }).catch((error)=>{
                res.status(500).json(error);
                console.log("Inside error 1");
                console.log(error);
            })
        }
    })
    
    

   
});

// login user
router.post('/login/user',async(req,res)=>{
    try{
        
        const user=await User.findOne({email:req.body.email});
        
        if(!user){
            // res.status(302).redirect("/register"); // redirect when not registered
            res.status(400).json({ success: false, message: "User Not found" });
        }else{
            const validate=await bcrypt.compare(req.body.password,user.password);
            if(!validate){
                
                res.status(400).json({ success: false, message: "Wrong Email or password" });
            }else{
                const accessToken = jwt.sign({
                    _id:user._id,  // adding id to the jwt for fourther access
                },process.env.jwtSec,{
                    expiresIn:"3d"
                });
                const {password,...others}=user._doc;
                res.status(200).json({...others,accessToken});// sending all data except the password
            }
        }
    }catch{
        res.status(500).json({ success: false, message: "login failed" });
    }
});

router.post('/login/driver',async(req,res)=>{
    try{
        
        const driver=await Driver.findOne({email:req.body.email});
        
        if(!driver){
            // res.status(302).redirect("/register"); // redirect when not registered
            res.status(400).json({ success: false, message: "User Not found" });
        }else{
            const validate=await bcrypt.compare(req.body.password, driver.password);

            if(!validate){
                
                res.status(400).json({ success: false, message: "Wrong Email or password" });
            }else{
                const accessToken = jwt.sign({
                    _id:driver._id,  // adding id to the jwt for fourther access
                },process.env.jwtSec,{
                    expiresIn:"3d"
                });
                const {password,...others}=driver._doc;
                res.status(200).json({...others,accessToken});// sending all data except the password
            }
        }
    }catch{
        res.status(500).json({ success: false, message: "login failed" });
    }
});


router.post("/logout/user", function (req, res) {
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
    if (logout) {
    res.status(200).send({success:true,msg : 'You have been Logged Out' });
    } else {
    res.status(400).send({success:false,msg:'Error'});
    }
    });
    });

router.post("/logout/driver", function (req, res) {
    const authHeader = req.headers["authorization"];
    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
    if (logout) {
    res.status(200).send({success:true,msg : 'You have been Logged Out' });
    } else {
    res.status(400).send({success:false,msg:'Error'});
    }
    });
    });


module.exports=router;