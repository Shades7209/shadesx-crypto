const axios = require("axios");

const getChart = async (req, res) => {
    try {
        const { coin, days } = req.body;


        let interval = "1"; // default 1 min
        if (days == 7) interval = "60";      // hourly
        if (days == 30) interval = "240";    // 4h
        if (days >= 90) interval = "D";

        // daily



        const url = `${process.env.BYBIT_API_URL}/kline?category=spot&symbol=${coin}USDT&interval=${days}&limit=120`;

        const response = await axios.get(url);


        const list = response.data?.result?.list || [];


        const formatted = list.reverse().map(item => ({
            time: Number(item[0]),   // timestamp
            price: Number(item[4])   // close price
        }));

        res.json(formatted);

    } catch (err) {
        console.log("BYBIT ERROR:", err?.response?.data || err.message);
        res.status(500).json({ error: "Failed to fetch chart" });
    }
};

module.exports = { getChart };
