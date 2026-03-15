const authRouter = require("./auth.routes");
const walletRouter = require("./wallet.routes");
const transactionRouter = require("./transaction.routes");
const marketRouter = require("./market.routes");
const aiRouter = require("./ai.routes");

module.exports = {
  authRouter,
  walletRouter,
  transactionRouter,
  marketRouter,
  aiRouter,
};
