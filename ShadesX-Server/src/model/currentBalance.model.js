const mongoose = require('mongoose');

const currentbalanceSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    balance: {
        type: Number,
        default: 0,
        min:10
    }
})

const CBModel = mongoose.model("currentBalance", currentbalanceSchema);

module.exports = { CBModel };
