const Trip = require("../models/tripSchema");

const User = require("../models/User");
const Driver = require("../models/Driver");
// const { makeRequest } = require("../request");

const axios = require("axios");

// Function to calculate distance and time using Google Distance Matrix API
const calculateDistance = async (sourceAddress, destinationAddress) => {
  try {
    // Geocode source address
    const sourceResponse = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: sourceAddress,
          format: "json",
          limit: 1,
        },
      }
    );

    const sourceLatitude = parseFloat(sourceResponse.data[0].lat);
    const sourceLongitude = parseFloat(sourceResponse.data[0].lon);

    // Geocode destination address
    const destinationResponse = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: destinationAddress,
          format: "json",
          limit: 1,
        },
      }
    );

    const destinationLatitude = parseFloat(destinationResponse.data[0].lat);
    const destinationLongitude = parseFloat(destinationResponse.data[0].lon);

    // Calculate distance using latitude and longitude coordinates
    const earthRadius = 6371; // Earth's radius in kilometers

    const latDiff = (destinationLatitude - sourceLatitude) * (Math.PI / 180);
    const lonDiff = (destinationLongitude - sourceLongitude) * (Math.PI / 180);

    const a =
      Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
      Math.cos((sourceLatitude * Math.PI) / 180) *
        Math.cos((destinationLatitude * Math.PI) / 180) *
        Math.sin(lonDiff / 2) *
        Math.sin(lonDiff / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance.toFixed(2); // Return the distance rounded to 2 decimal places
  } catch (error) {
    throw new Error(
      "Failed to calculate distance using OpenStreetMap Nominatim API."
    );
  }
};

// POST /Create a new trip
exports.createTrip = async (req, res) => {
  const { userId, driverId, sourceAddress, destinationAddress, price } =
    req.body;

  try {
    // Check if the user and driver exist
    const user = await User.findById(userId);
    const driver = await Driver.findById(driverId);

    if (!user || !driver) {
      return res.status(404).json({ error: "User or driver not found" });
    }

    const distance = await calculateDistance(sourceAddress, destinationAddress);

    const newTrip = new Trip({
      userId: user._id,
      driverId: driver._id,
      sourceAddress,
      destinationAddress,
      distance,
      price,
    });

    // await newTrip.save((error, savedTrip) => {
    //   if (error) {
    //     return res.status(500).json({
    //       status: "error",
    //       message: "Failed to save the new trip",
    //     });
    //   }
    await newTrip.save();

    res.status(200).json({
      status: "success",
      data: {
        trip: newTrip,
      },
    });
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// GET /trips/getCurrentDriverTrips
exports.getCurrentDriverTrips = async (req, res) => {
  const { driverId } = req.query;

  try {
    const trips = await Trip.find({ driverId });
    res.status(200).json({ trips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /trips/getCurrentUserTrips
exports.getCurrentUserTrips = async (req, res) => {
  const { userId } = req.query;

  try {
    const trips = await Trip.find({ userId });
    res.status(200).json({ trips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /trips/getCurrentUserTrip/:tripId
exports.getCurrentUserTrip = async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findById(tripId);
    res.status(200).json({ trip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// // GET /trips/trips-within/start-loc/:startLatLng/end-loc/:endLatLng
// exports.getTripsWithinStartAndEndLocations = async (req, res) => {
//   const { startLatLng, endLatLng } = req.params;

//   try {
//     const trips = await Trip.find({
//       //
//     });

//     res.status(200).json({ trips });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
