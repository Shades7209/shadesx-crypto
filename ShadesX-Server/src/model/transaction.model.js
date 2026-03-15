const mongoose = require('mongoose');

const TransactionScheme = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    type:String,
    status:String,
    amount:Number,
    price:Number,
    currency:String,
    product:String,
    logo:String,

},{timestamps:true})

const TModel = mongoose.model("transaction",TransactionScheme);

module.exports = { TModel };
