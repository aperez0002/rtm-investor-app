import { Schema, model } from "mongoose";


const OverallStatSchema = new Schema(
    {
        totalCustomers: Number,
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalSales: Number,
                totalUnits: Number
            }
        ],
        dailyData: [
            {
                date: String,
                totalSales: Number,
                totalUnits: Number,
            },
        ],
        salesByCategory: {
            type: Map, //Creates a javascript object
            of: Number,
        }
    },
    {
        timestamps: { currentTime: () => new Date()}
    }
);

const OverallStat = model('OverallStat', OverallStatSchema);

export default OverallStat;