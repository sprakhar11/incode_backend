const Bookmark = require("../models/BookmarkSchema");

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
