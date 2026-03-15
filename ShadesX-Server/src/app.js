const express = require('express');
const userModel = require("./model");
const ImageModel = require("./model");
const app = express();
const multer = require("multer");
const uploadImage = require("./Services/storage.service");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();



app.use(express.json())
app.use(cors())
app.use(cookieParser());

const upload = multer({ storage: multer.memoryStorage()})


const message = []


app.use("/api/auth", routes.authRouter);
app.use("/api/wallet", routes.walletRouter);
app.use("/api/transaction", routes.transactionRouter);
app.use("/api/market", routes.marketRouter);
app.use("/api/ai", routes.aiRouter);





module.exports=app