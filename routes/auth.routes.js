
const express = require("express");
const { registerUser, loginUser ,getAllUser } = require("../controller/authController");
const router = express.Router();

router.post("/register", registerUser )
router.post("/login", loginUser )
router.get("/getAllUser", getAllUser )

module.exports = router;