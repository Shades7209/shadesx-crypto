const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    symbol: {type: String, unique: true,},
    name:String,
    logo: {type: String},
    decimals: {type: Number, default: 8},
})

const CoinModel = mongoose.model("coin", coinSchema);

module.exports = { CoinModel };
