import { Schema, model } from "mongoose";


const BalanceDataSchema = new Schema(
    {
        monthlyData: [
            {
                month: String,
                year: String,
                totalBalance: Number,
                totalCash: Number,
            }
        ],
        dailyData: [
            {
                date: String,
                totalBalance: Number,
                totalCash: Number,
            },
        ],
    },
    {
        timestamps: true
    }
);

const BalanceData = model('BalanceData', BalanceDataSchema);

export default BalanceData;