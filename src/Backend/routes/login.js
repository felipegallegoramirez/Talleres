const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller")
const {checkAuth , checkpermision} = require('../midleware/authverify')


router.post("/", user.LoginUser); 



module.exports = router 