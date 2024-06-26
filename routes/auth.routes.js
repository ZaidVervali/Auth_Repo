
const express = require("express");
const { registerUser, loginUser ,getAllUser , getSpecificUser, updUser } = require("../controller/authController");
const router = express.Router();

router.post("/register", registerUser )
router.post("/login", loginUser )
router.get("/getAllUser", getAllUser )
router.get("/getUser/:id", getSpecificUser )
router.put("/updUser/:id", updUser )

module.exports = router;