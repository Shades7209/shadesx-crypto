const express = require("express");
const { MarketController } = require("../controllers");

const router = express.Router();

router.post("/getchart", MarketController.getChart);

module.exports = router;
