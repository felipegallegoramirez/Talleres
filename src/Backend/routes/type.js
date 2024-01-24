const express = require("express");
const router = express.Router();
const type = require("../controllers/type.controller")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/", type.getTypes);
router.post("/", type.createType); 
router.get("/:id", type.getType); 
router.put("/:id",type.editType);
router.delete("/:id", type.deleteType);


module.exports = router 