const express = require("express");
const { WalletController } = require("../controllers");

const router = express.Router();

router.post("/currentbalance", WalletController.currentBalance);
router.post("/currentBalancefetch", WalletController.currentBalanceFetch);
router.post("/fetchwallet", WalletController.walletBalance);
router.post("/cbfetch", WalletController.coinbalancefetch);
router.post("/putcoinbalance", WalletController.updateCoinBalance);

module.exports = router;
