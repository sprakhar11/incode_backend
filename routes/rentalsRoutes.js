const express = require("express");
const router = express.Router();
const rentController = require("../controllers/rentals");

// Create a new rental
router.post("/createRental", rentController.createRental);

// Extend the rental time
router.put("/user/:rentId/extend", rentController.extendRental);

// View User Rentals
router.get("/user/:userId", rentController.viewUserRentals);

module.exports = router;
