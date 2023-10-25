const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const DATABASE_URL = process.env.DATABASE_URL;
console.log("hit 1 check");
console.log(DATABASE_URL);
const connectdb = require("./database/database.js");
connectdb(DATABASE_URL);
const cors = require("cors");
app.use(express.json()); // to parse the json files
app.use(cors()); // to allow cross origin resource sharing
config({ path: "./config/config.env" });
import paymentRoute from "./routes/paymentRoutes.js";
import Razorpay from "razorpay";


export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

// routes require
const homeRoute = require("./routes/index");
app.use("/api", paymentRoute);

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);
app.use("/", homeRoute);

app.use("", (req, res) => {
  // for useless links
  res.send("error 404");
});
app.listen(port, (error) => {
  if (error) {
    console.log("error in starting the server");
  } else {
    console.log("server started", port);
  }
});
