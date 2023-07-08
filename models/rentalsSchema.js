const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  driverId: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Rental", rentSchema);
