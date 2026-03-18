const express = require('express');

const app = express();


const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();



app.use(express.json())
app.use(cors())
app.use(cookieParser());





app.use("/api/auth", routes.authRouter);
app.use("/api/wallet", routes.walletRouter);
app.use("/api/transaction", routes.transactionRouter);
app.use("/api/market", routes.marketRouter);
app.use("/api/ai", routes.aiRouter);





module.exports=app