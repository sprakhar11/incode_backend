const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  driverId: {
    type: String,
    required: true,
  },
  sourceAddress: {
    type: String,
    required: true,
  },
  destinationAddress: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String,
    default: () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },
    required: [true, "Please provide start time."],
  },
  estimatedTime: Date,
});

module.exports = mongoose.model("Trips", tripSchema);
