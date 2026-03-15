const express = require("express");
const { AuthController } = require("../controllers");

const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/registeremail", AuthController.registerEmail);

module.exports = router;