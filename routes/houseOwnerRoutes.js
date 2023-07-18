const express = require("express");
const router = express.Router();
const houseOwnerController = require("../controllers/houseOwnerController");
const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router.get("/", houseOwnerController.getAllHouse);
router.post("/", houseOwnerController.createNewHouse);

router.patch("/", houseOwnerController.updateHouse);
router.delete("/", houseOwnerController.deleteHouse);

module.exports = router;
