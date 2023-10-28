// const { instance } = require("../index.js");
// import crypto from "crypto";
const crypto = require("crypto");
const  Payment = require("../models/paymentModel");
const dotenv=require("dotenv");
dotenv.config();

const checkout = async (req, res) => {

    console.log(req.body);
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };

    console.log(options);

    const Razorpay = require("razorpay");


    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_APT_SECRET,
    });

    var order;
    try{

      order = await instance.orders.create(options);

    } catch(err){

      console.log(err);

    }

    res.status(200).json({
      success: true,
      order,
  });
};

const paymentVerification = async (req, res) => {

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

    console.log(req.body);

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = {
  checkout,
  paymentVerification,
}
