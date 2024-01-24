const express = require("express");
const router = express.Router();
const monitoring = require("../controllers/monitoring.controller")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/", monitoring.getMonitorings);
router.post("/", monitoring.createMonitoring); 
router.get("/:id", monitoring.getMonitoring); 
router.put("/:id",monitoring.editMonitoring);
router.delete("/:id", monitoring.deleteMonitoring);


module.exports = router 