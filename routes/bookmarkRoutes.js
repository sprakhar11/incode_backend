const express = require("express");
const router = express.Router();
const bookmarkController = require("../controllers/bookmark");

//Create bookmark
router.post("/createBookmarks", bookmarkController.createBookmark);

// Get all bookmarks
router.get("/allBookmarks", bookmarkController.getAllBookmarks);

// Get current user's bookmarks
router.get(
  "/allBookmarks/current/:userId",
  bookmarkController.getCurrentUserBookmarks
);

module.exports = router;
