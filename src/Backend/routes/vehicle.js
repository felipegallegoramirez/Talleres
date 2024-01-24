const express = require("express");
const router = express.Router();
const vehicle = require("../controllers/vehicle.controller")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/", vehicle.getVehicles);
router.post("/", vehicle.createVehicle); 
router.get("/:id", vehicle.getVehicle); 
router.put("/:id",vehicle.editVehicle);
router.delete("/:id", vehicle.deleteVehicle);


module.exports = router 