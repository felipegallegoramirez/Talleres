const express = require("express");
const router = express.Router();
const category = require("../controllers/category.controller")
const {checkAuth , checkpermision} = require('../midleware/authverify')

router.get("/", category.getCategorys);
router.post("/", category.createCategory); 
router.get("/:id", category.getCategory); 
router.put("/:id",category.editCategory);
router.delete("/:id", category.deleteCategory);


module.exports = router 