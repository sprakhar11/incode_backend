const express = require("express");
const dotenv=require("dotenv");
dotenv.config();


const  {
  checkout,
  paymentVerification,
} = require( "../controllers/paymentController" );


const router = express.Router();


router.post("/checkout", checkout);

router.route("/paymentverification").post(paymentVerification);

router.get("/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

module.exports = router;

