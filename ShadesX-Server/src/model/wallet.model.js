const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    coin:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'coin',
    },
    balance:{
        type:Number,
        default:0
    },

},{timestamps: true})

const WalletModel = mongoose.model("wallet", walletSchema);

module.exports = { WalletModel };
