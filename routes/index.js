const express = require("express");
const router = express.Router();

// this is dictionary page of all the routes
const userRoute = require("./user");
const authRoute = require("./auth");
const driverRoute = require("./driver");
const tripRoutes = require("./tripRoutes");
const bookmarkRoutes = require("./bookmarkRoutes");

router.get("/", (req, res) => {
  res.send("Welcome to Incode Backend Api portal");
});

router.use("/api/user", userRoute);
router.use("/api/auth", authRoute);
router.use("/api/driver", driverRoute);
router.use("/api/trips", tripRoutes);
router.use("/api/bookmarks", bookmarkRoutes);

module.exports = router;
