const Bookmark = require("../models/BookmarkSchema");
const User = require("../models/User");
const Driver = require("../models/Driver");

// Create bookmarks
exports.createBookmark = async (req, res) => {
  const { userId, driverId } = req.body;

  try {
    const user = await User.findById(userId);
    const driver = await Driver.findById(driverId);

    if (!user || !driver) {
      return res.status(404).json({ error: "User or driver not found" });
    }

    const bookmark = new Bookmark({
      userName: user.name,
      userId: user._id,
      driverId: driver._id,
      driverName: driver.name,
    });

    await bookmark.save();
    res
      .status(200)
      .json({ message: "Bookmark created successfully", bookmark });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all bookmarks
exports.getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve bookmarks" });
  }
};

// Get current user's bookmarks
exports.getCurrentUserBookmarks = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookmarks = await Bookmark.find({ userId });
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user bookmarks" });
  }
};
