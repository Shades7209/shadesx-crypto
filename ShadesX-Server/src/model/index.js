const { UserModel } = require('./user.model');
const { tempUserModel } = require('./tempUser.model');
const { WalletModel } = require('./wallet.model');
const { CoinModel } = require('./coin.model');
const { CBModel } = require('./currentBalance.model');
const { TModel } = require('./transaction.model');

module.exports = { UserModel, tempUserModel, WalletModel, CoinModel, CBModel, TModel };
