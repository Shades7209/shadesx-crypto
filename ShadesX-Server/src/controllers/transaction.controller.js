const UserModel = require("../model");

const Transaction = async (req, res) => {
    try{
        const{id,type,status,amount,price,currency,product,logo}=req.body;

        await UserModel.TModel.create({
            user:id,
            type,
            status,
            amount,
            price,
            currency,
            product,
            logo

        })
        res.status(200).send({
            status: "Transaction Made",
        })
    }catch (error){
        res.status(500).send({ message: error.message });
    }
}

const FetchTransaction = async (req, res) => {
    const {id} = req.body;
    try {
        const re = await UserModel.TModel.find({user:id}).sort({ createdAt: -1 });
        res.status(200).send({
            re,
            message:"Successfully",
        })
    }catch (error){
        res.status(500).send({ message: error.message });
    }
}

module.exports = { Transaction, FetchTransaction };
