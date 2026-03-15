const express = require("express");
const { AIController } = require("../controllers");

const router = express.Router();

router.post("/test", AIController.test);

module.exports = router;
