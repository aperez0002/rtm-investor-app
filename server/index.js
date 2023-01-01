import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import schedule from 'node-schedule';

import authRoutes from "./routes/auth.js"
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/management.js"
import salesRoutes from "./routes/sales.js"
import balancesRoutes from "./routes/balances.js"

/* DATA IMPORTS */
import User from "./models/User.js";
import Product from "./models/Product.js"
import ProductStat from "./models/ProductStat.js"
import Transaction from './models/Transaction.js';
import OverallStat from './models/OverallStat.js';
import AffiliateStat from './models/AffiliateStat.js';
import BalanceData from './models/BalanceData.js';
import { 
    dataUser, 
    dataProduct, 
    dataProductStat, 
    dataTransaction, 
    dataOverallStat, 
    dataAffiliateStat, 
    dataBalances
} from "./data/index.js"

import { getTDBalances, refreshToken } from './controllers/tdApi.js';

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);
app.use("/tdData", balancesRoutes);

// Runs refreshToken every 30 minutes
schedule.scheduleJob('*/30 * * * *', refreshToken);

// Runs getBalances every day at 23:59:53 
schedule.scheduleJob('53 59 23 * * *', getTDBalances);
// schedule.scheduleJob('*/30 * * * * *', getTDBalances);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
    // BalanceData.insertMany(dataBalances);
}).catch((error) => console.log(`${error} did not connect`))