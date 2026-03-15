const express = require("express");
const { TransactionController } = require("../controllers");

const router = express.Router();

router.post("/transaction", TransactionController.Transaction);
router.post("/fetchtransaction", TransactionController.FetchTransaction);

module.exports = router;
