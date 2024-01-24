const express = require("express");
const router = express.Router();
const actions = require("../controllers/actions.controller")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/", actions.getActionss);
router.post("/", actions.createActions); 
router.get("/:id", actions.getActions); 
router.put("/:id",actions.editActions);
router.delete("/:id", actions.deleteActions);


module.exports = router;