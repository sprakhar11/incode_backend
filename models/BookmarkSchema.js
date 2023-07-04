const mongoose = require("mongoose");
const User = require("./User");
const Driver = require("./Driver");

const bookmarkSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Driver,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
