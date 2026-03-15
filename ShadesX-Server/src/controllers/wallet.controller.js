const UserModel = require("../model");
const axios = require("axios");

const currentBalance = async (req, res) => {
    const {id, balance} = req.body;

    try{
        await UserModel.CBModel.findOneAndUpdate({user:id},{$inc:{balance:balance}},{new:true,runValidators:true})

        res.status(200).send({
            status: "Deposit Success",
        })
    }catch (error){
        res.status(500).send({ message: error.message });
    }
}

const walletBalance = async (req, res) => {
    const { id } = req.body;

    try {


        const coins = await UserModel.CoinModel.find();


        const wallet = await UserModel.WalletModel.find({ user: id }).populate('coin').lean();
        const ar = Array.from(wallet)
        const ids = ar.map(item => item.coin.name).join(",").toLowerCase();

        const price = await axios.get(`${process.env.COINGECKO_API_URL}/simple/price?ids=${ids}&vs_currencies=inr&x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}`)
        const finalprice = price.data


        let total = 0;
        const breakdown = {};



        ar.forEach(item => {
            const id = item.coin.name.toLowerCase();

            const prices = price.data[id].inr;
            pr = [prices]

            const value = prices * item.balance;
            breakdown[item.coin.symbol] = value;
            total += value;

        });

        res.status(200).send({

            wallet: {
                wallet,
                total,
                breakdown
            }


        })

    } catch (error) {
        return res.status(400).send({ message: error });
    }
};

const currentBalanceFetch = async (req, res) => {
    const {id} = req.body

    try{
        const user = await UserModel.CBModel.findOne({user:id})
        res.status(200).send({
            user
        })
        console.log(user)
    }catch (error){
        res.status(500).send({ message: error.message });
    }

}

const coinbalancefetch = async (req, res) => {
    const {id,symbol} = req.body;
    try{
        const wallet = await UserModel.WalletModel.find({ user: id }).populate('coin').lean();

        const ar = Array.from(wallet)

        const coinWallet = wallet.find(item => item.coin.symbol === symbol);
        if(!coinWallet){
            res.status(202).send({
                code:404,
                balance:0
            })
        }

        const balance = coinWallet ? coinWallet.balance : 0;

        res.status(200).send({
            balance,
        })

    }catch (error){
        res.status(500).send({ message: error.message });
        console.log(symbol,id);
    }
}

const updateCoinBalance = async (req, res) => {
    const { symbol,id,balance,amount } = req.body;

    const sy = symbol.toUpperCase()

    try {
        const coins = await UserModel.CoinModel
            .find({ symbol:sy })
            .lean();
        await UserModel.WalletModel.findOneAndUpdate(
            {
                user:id,
                coin:coins[0]._id
            },{$inc:{balance:balance}}).lean()

        await UserModel.CBModel.findOneAndUpdate({user:id},{$inc:{balance:-amount}})


        res.status(200).json({
            message:"Successfully",
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    currentBalance,
    walletBalance,
    currentBalanceFetch,
    coinbalancefetch,
    updateCoinBalance
};
