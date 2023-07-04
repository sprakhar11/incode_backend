const Trip = require("../models/tripSchema");
const distanceMatrix = require("google-distance-matrix");

// Function to calculate distance and time using Google Distance Matrix API
const calculateDistanceAndTime = async (source, destination) => {
  return new Promise((resolve, reject) => {
    const config = {
      key: "YOUR_GOOGLE_MAPS_API_KEY",
      origins: [source],
      destinations: [destination],
    };

    distanceMatrix.matrix(config, (err, response) => {
      if (err) {
        reject(err);
      } else {
        const distance = response.rows[0].elements[0].distance.value;
        const time = response.rows[0].elements[0].duration.value;
        resolve({ distance, time });
      }
    });
  });
};

// POST /Create a new trip
exports.createTrip = async (req, res) => {
  try {
    // Extract the necessary data from the request body
    const {
      tripId,
      driverId,
      userId,
      sourceAddress,
      destinationAddress,
      distance,
      time,
      price,
    } = req.body;

    // Create the new trip
    const newTrip = await Trip.create({
      tripId,
      driverId,
      userId,
      sourceAddress,
      destinationAddress,
      distance,
      time,
      price,
    });

    const savedTrip = await newTrip.save();

    res.status(200).json({
      status: "success",
      data: {
        trip: newTrip,
      },
    });
  } catch (err) {
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
