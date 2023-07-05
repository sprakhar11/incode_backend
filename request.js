const axios = require("axios");

axios
  .post("localhost/api/trips/createTrip")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log("Abra ka dabra");
    console.error(error);
  });
