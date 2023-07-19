const express = require("express");
const router = express.Router();
const houseOwnerController = require("../controllers/houseOwnerController");
const verifyJWT = require("../middleware/verifyJWT");

router
  .route("/")
  .get(houseOwnerController.getAllHouse) // No verifyJWT middleware here
  .post(verifyJWT, houseOwnerController.createNewHouse) // verifyJWT only applies to createNewHouse, updateHouse, and deleteHouse
  .patch(verifyJWT, houseOwnerController.updateHouse)
  .delete(verifyJWT, houseOwnerController.deleteHouse);

module.exports = router;
