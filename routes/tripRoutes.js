const express = require("express");
const router = express.Router();
const tripController = require("../controllers/trip");

// Create a new trip
router.post("/createTrip", tripController.createTrip);

// GET /trips/getCurrentDriverTrips
router.get("/getCurrentDriverTrips", tripController.getCurrentDriverTrips);

// GET /trips/getCurrentUserTrips
router.get("/getCurrentUserTrips", tripController.getCurrentUserTrips);

// GET /trips/getCurrentUserTrip/:tripId
router.get("/getCurrentUserTrip/:tripId", tripController.getCurrentUserTrip);

// // GET /trips/trips-within/start-loc/:startLatLng/end-loc/:endLatLng
// router.get(
//   '/trips-within/start-loc/:startLatLng/end-loc/:endLatLng',
//   tripController.getTripsWithinStartAndEndLocations
// );

module.exports = router;
