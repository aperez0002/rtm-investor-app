import User from "../models/User.js";
import OverallStat from '../models/OverallStat.js'
import Transaction from "../models/Transaction.js"
import BalanceData from "../models/BalanceData.js";
import Balances from "../models/Balances.js";


export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getDashboardStats = async (req, res) => {
    try{
        // hardcoded values
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        /* Recent Transactions */
        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });

        /* Overall Stats */
        const overallStat = await OverallStat.find({ year: currentYear });

        /* Balance Data */
        const balData = await Balances.findOne({
            createdAt: {$lte: Date.now(), $gte: Date.now() - 23 * 60 * 60 * 1000}
        })

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        } = overallStat[0];

        const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
            return month === currentMonth;
        });

        const todayStats = overallStat[0].dailyData.find(({ date }) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions,
            balData
        });

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}