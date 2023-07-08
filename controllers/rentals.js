const Rental = require("../models/rentalsSchema");

// Create a new rental
exports.createRental = async (req, res) => {
  const { userId, driverId, vehicleNumber, startTime, endTime } = req.body;

  // Calculate the rental duration and price
  const duration = Math.abs(new Date(endTime) - new Date(startTime));
  const hours = Math.ceil(duration / (1000 * 60 * 60));
  const pricePerHour = 100; // Adjust the rate as per your requirement
  const price = hours * pricePerHour;

  try {
    // Check if the rental duration exceeds 6 hours
    if (hours > 6) {
      return res.status(400).json({
        success: false,
        message: "Rental duration cannot exceed 6 hours",
      });
    }

    const rental = await Rental.create({
      userId,
      driverId,
      vehicleNumber,
      startTime,
      endTime,
      price,
    });

    res.status(200).json({
      success: true,
      rental,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Extend the rental time
exports.extendRental = async (req, res) => {
  const { rentId } = req.params;
  const { endTime } = req.body;

  try {
    const rental = await Rental.findById(rentId);

    if (!rental) {
      return res
        .status(404)
        .json({ success: false, message: "Rental not found" });
    }

    // Calculate the new rental duration and price
    const duration = Math.abs(new Date(endTime) - rental.startTime);
    const hours = Math.ceil(duration / (1000 * 60 * 60));
    const pricePerHour = 10; // Adjust the rate as per your requirement
    const price = hours * pricePerHour;

    // Check if the rental duration exceeds 6 hours
    if (hours > 6) {
      return res.status(400).json({
        success: false,
        message: "Rental duration cannot exceed 6 hours",
      });
    }

    rental.endTime = endTime;
    rental.price = price;

    if (hours <= 6) {
      await rental.save();
    }

    res.status(200).json({
      success: true,
      rental,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// View rentals of a user
exports.viewUserRentals = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find rentals associated with the user
    const rentals = await Rental.find({ userId });

    res.status(200).json({
      success: true,
      rentals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
