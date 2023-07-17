const express = require("express");
const router = express.Router();
const houseOwnerController = require("../controllers/houseOwnerController");

router.get("/", houseOwnerController.getAllHouse);
router.post("/", houseOwnerController.createNewHouse);

router.patch("/:id", houseOwnerController.updateHouse);
router.delete("/:id", houseOwnerController.deleteHouse);

module.exports = router;
