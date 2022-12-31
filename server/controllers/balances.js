import BalanceData from "../models/BalanceData.js";

export const getBalances = async (req, res) => {
    try{
        const balances = await BalanceData.find()

        res.status(200).json(balances[0]);
    } catch (error) {
        res.status(404).json({ message: error.message})
    }
}