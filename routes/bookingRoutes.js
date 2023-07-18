const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/houseBookingController");

router.get("/", bookingController.getAllBooking);
router.post("/", bookingController.bookHouse);

router.delete("/:id", bookingController.deleteBooking);

module.exports = router;
