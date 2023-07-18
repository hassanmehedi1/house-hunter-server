const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/houseBookingController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/", bookingController.getAllBooking);
router.post("/", bookingController.bookHouse);

router.delete("/", bookingController.deleteBooking);

module.exports = router;
