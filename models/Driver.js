const mongoose=require("mongoose");
const { boolean } = require("webidl-conversions");

const driverSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    mobileNumber:{
        type:Number,
        require,
    },
    gender:{
        type:String,
        required:true,
    },
    vehicleNumber:{
        type:String,
        required:true,
    },
    vehicleType:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
    
},{collection:"driver",timestamps:true});

module.exports = mongoose.model("Driver",driverSchema);