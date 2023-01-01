import BalanceData from "../models/BalanceData.js";
import Balances from "../models/Balances.js";
import TDToken from "../models/TDToken.js"
import mongoose from "mongoose";
import axios from "axios"
import qs from "qs"

var db = mongoose.connection;

// Login here every 90 days to get a new access token
// https://auth.tdameritrade.com/auth?response_type=code&redirect_uri=http://localhost:5001/tdData/tdAuth&client_id=AHYMORM68XQMA1DVGYKEKIZ2AVSQIPYF%40AMER.OAUTHAP
export const getTDAuth = (req, res) => {

    // Set up the data object... req.query.code grabs the code off the redirect link from tda
    const data = {
        grant_type: 'authorization_code',
        access_type: 'offline',
        client_id: "AHYMORM68XQMA1DVGYKEKIZ2AVSQIPYF@AMER.OAUTHAP",
        code: req.query.code,
        redirect_uri: "http://localhost:5001/tdData/tdAuth"
    }

    // Setting up the axios call options
    const options = {
        method: 'POST',
        headers: { "Content-Type" : "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
        url: 'https://api.tdameritrade.com/v1/oauth2/token'
    }

    axios(options).then(async (response) => {

        const newTDToken = new TDToken({
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            token_type: response.data.token_type,
            expires_in: response.data.expires_in,
            scope: response.data.scope,
            refresh_token_expires_in: response.data.refresh_token_expires_in,

        })        

        await newTDToken.save();
        // res.json(newTDToken);
        res.redirect('http://localhost:3001/dashboard')

        

        
    }).catch((error) => {
        console.log(error);
    })

};

export const refreshToken = async (req, res) => {
    
    const tdToken = await TDToken.findOne();

    // Set up the data object... req.query.code grabs the code off the redirect link from tda
    const data = {
        grant_type: 'refresh_token',
        refresh_token: tdToken.refresh_token,
        client_id: "AHYMORM68XQMA1DVGYKEKIZ2AVSQIPYF@AMER.OAUTHAP",
    }

    // Setting up the axios call options
    const options = {
        method: 'POST',
        headers: { "Content-Type" : "application/x-www-form-urlencoded" },
        data: qs.stringify(data),
        url: 'https://api.tdameritrade.com/v1/oauth2/token'
    }

    axios(options).then(async (response) => {

        // res.json({access_token: response.data.access_token})

        const updateAccessToken = await TDToken.findOneAndUpdate(
            {

            },
            {
                access_token: response.data.access_token
            },
            {
                new: true
            }
        )

        console.log("Updated Token at " + new Date());

        
    }).catch((error) => {
        console.log(error);
    })

};

export const getTDBalances = async (req, res) => {

    const tdToken = await TDToken.findOne();

    // Set up the data object... req.query.code grabs the code off the redirect link from tda
    const data = {
        fields: '',        
    }

    // Setting up the axios call options
    const options = {
        method: 'GET',
        headers: { "Authorization" : "Bearer " + tdToken.access_token },
        data: qs.stringify(data),
        url: 'https://api.tdameritrade.com/v1/accounts/236918686'
    }

    const monthNames = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June",
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];
    const d = new Date();
    const dateStr = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    const monthStr = monthNames[d.getMonth()];
    const yearStr = d.getFullYear();


    axios(options).then(async (response) => {

        const today = new Date();
        const endOfMonth = new Date(today.getFullYear(), today.getMonth(), 0)

        const todayString = today.toDateString();
        const endOfMonthString = endOfMonth.toDateString();

        if ( todayString === endOfMonthString ) {
            
            var id = "63ab7a36870d73744b14033e";
            BalanceData.updateOne(
            { _id: new mongoose.Types.ObjectId(id)},
            
            { $addToSet: {
                monthlyData: [
                    {
                        month: monthStr,
                        year: yearStr,
                        totalBalance: response.data.securitiesAccount.currentBalances.liquidationValue,
                        totalCash: response.data.securitiesAccount.currentBalances.availableFunds,
                    },
                ]
            }},

            function(err, object) {
                if (err){
                    console.warn(err.message)
                }else {
                    console.dir(object);
                }
            }

        );

        }

        // res.json(response.data)
        var id = "63ab7a36870d73744b14033e";
        BalanceData.updateOne(
            { _id: new mongoose.Types.ObjectId(id)},
            
            { $addToSet: {
                dailyData: [
                    {
                        date: dateStr,
                        totalBalance: response.data.securitiesAccount.currentBalances.liquidationValue,
                        totalCash: response.data.securitiesAccount.currentBalances.availableFunds,
                    },
                ]
            }},

            function(err, object) {
                if (err){
                    console.warn(err.message)
                }else {
                    console.dir(object);
                }
            }

        );

        const d = new Date();
        const balances = new Balances({
            securities_account: {
                account_type: response.data.securitiesAccount.type,
                account_id: response.data.securitiesAccount.accountId,
                round_trips: response.data.securitiesAccount.roundTrips,
                is_day_trader: response.data.securitiesAccount.isDayTrader,
                is_closing_only_restricted: response.data.securitiesAccount.isClosingOnlyRestricted,
                initial_balances: {
                    accrued_interest: response.data.securitiesAccount.initialBalances.accruedInterest,
                    available_funds_non_marginable_trade: response.data.securitiesAccount.initialBalances.availableFundsNonMarginableTrade,
                    bond_value: response.data.securitiesAccount.initialBalances.bondValue,
                    buying_power: response.data.securitiesAccount.initialBalances.buyingPower,
                    cash_balance: response.data.securitiesAccount.initialBalances.cashBalance,
                    cash_available_for_trading: response.data.securitiesAccount.initialBalances.cashAvailableForTrading,
                    cash_receipts: response.data.securitiesAccount.initialBalances.cashReceipts,
                    day_trading_buying_power: response.data.securitiesAccount.initialBalances.dayTradingBuyingPower,
                    day_trading_buying_power_call: response.data.securitiesAccount.initialBalances.dayTradingBuyingPowerCall,
                    day_trading_equity_call: response.data.securitiesAccount.initialBalances.dayTradingEquityCall,
                    equity: response.data.securitiesAccount.initialBalances.equity,
                    equity_percentage: response.data.securitiesAccount.initialBalances.equityPercentage,
                    liquidation_value: response.data.securitiesAccount.initialBalances.liquidationValue,
                    long_magin_value: response.data.securitiesAccount.initialBalances.longMarginValue,
                    long_option_market_value: response.data.securitiesAccount.initialBalances.longOptionMarketValue,
                    long_stock_value: response.data.securitiesAccount.initialBalances.longStockValue,
                    maintenance_call: response.data.securitiesAccount.initialBalances.maintenanceCall,
                    maintenance_requirement: response.data.securitiesAccount.initialBalances.maintenanceRequirement,
                    margin: response.data.securitiesAccount.initialBalances.margin,
                    margin_equity: response.data.securitiesAccount.initialBalances.marginEquity,
                    money_market_fund: response.data.securitiesAccount.initialBalances.moneyMarketFund,
                    mutual_fund_value: response.data.securitiesAccount.initialBalances.mutualFundValue,
                    reg_t_call: response.data.securitiesAccount.initialBalances.regTCall,
                    short_margin_value: response.data.securitiesAccount.initialBalances.shortMarginValue,
                    short_option_market_value: response.data.securitiesAccount.initialBalances.shortOptionMarketValue,
                    short_stock_value: response.data.securitiesAccount.initialBalances.shortStockValue,
                    total_cash: response.data.securitiesAccount.initialBalances.totalCash,
                    is_in_call: response.data.securitiesAccount.initialBalances.isInCall,
                    pending_deposits: response.data.securitiesAccount.initialBalances.pendingDeposits,
                    margin_balance: response.data.securitiesAccount.initialBalances.marginBalance,
                    short_balance: response.data.securitiesAccount.initialBalances.shortBalance,
                    account_value: response.data.securitiesAccount.initialBalances.accountValue
                },
                current_balances: {
                    accrued_interest: response.data.securitiesAccount.currentBalances.accruedInterest,
                    cash_balance: response.data.securitiesAccount.currentBalances.cashBalance,
                    cash_receipts: response.data.securitiesAccount.currentBalances.cashReceipts,
                    long_option_market_value: response.data.securitiesAccount.currentBalances.longOptionMarketValue,
                    liquidation_value: response.data.securitiesAccount.currentBalances.liquidationValue,
                    longMarket_value: response.data.securitiesAccount.currentBalances.longMarketValue,
                    moneyMarket_fund: response.data.securitiesAccount.currentBalances.moneyMarketFund,
                    savings: response.data.securitiesAccount.currentBalances.savings,
                    short_market_value: response.data.securitiesAccount.currentBalances.shortMarketValue,
                    pending_deposits: response.data.securitiesAccount.currentBalances.pendingDeposits,
                    available_funds: response.data.securitiesAccount.currentBalances.availableFunds,
                    available_funds_non_marginable_trade: response.data.securitiesAccount.currentBalances.availableFundsNonMarginableTrade,
                    buying_power: response.data.securitiesAccount.currentBalances.buyingPower,
                    buying_power_non_marginable_trade: response.data.securitiesAccount.currentBalances.buyingPowerNonMarginableTrade,
                    day_trading_buying_power: response.data.securitiesAccount.currentBalances.dayTradingBuyingPower,
                    equity: response.data.securitiesAccount.currentBalances.equity,
                    equity_percentage: response.data.securitiesAccount.currentBalances.equityPercentage,
                    long_margin_value: response.data.securitiesAccount.currentBalances.longMarginValue,
                    maintenance_call: response.data.securitiesAccount.currentBalances.maintenanceCall,
                    maintenance_requirement: response.data.securitiesAccount.currentBalances.maintenanceRequirement,
                    margin_balance: response.data.securitiesAccount.currentBalances.marginBalance,
                    reg_t_call: response.data.securitiesAccount.currentBalances.regTCall,
                    short_balance: response.data.securitiesAccount.currentBalances.shortBalance,
                    short_margin_value: response.data.securitiesAccount.currentBalances.shortMarginValue,
                    short_option_market_value: response.data.securitiesAccount.currentBalances.shortOptionMarketValue,
                    sma: response.data.securitiesAccount.currentBalances.sma,
                    mutual_fund_value: response.data.securitiesAccount.currentBalances.mutualFundValue,
                    bond_value: response.data.securitiesAccount.currentBalances.bondValue
                },
                projected_balances: {
                    available_funds: response.data.securitiesAccount.projectedBalances.availableFunds,
                    available_funds_non_marginable_trade: response.data.securitiesAccount.projectedBalances.availableFundsNonMarginableTrade,
                    buying_power: response.data.securitiesAccount.projectedBalances.buyingPower,
                    day_trading_buying_power: response.data.securitiesAccount.projectedBalances.dayTradingBuyingPower,
                    day_trading_buying_power_call: response.data.securitiesAccount.projectedBalances.dayTradingBuyingPowerCall,
                    maintenance_call: response.data.securitiesAccount.projectedBalances.maintenanceCall,
                    reg_t_call: response.data.securitiesAccount.projectedBalances.regTCall,
                    is_in_call: response.data.securitiesAccount.projectedBalances.isInCall,
                    stock_buying_power: response.data.securitiesAccount.projectedBalances.stockBuyingPower
                
                }
            },

            createdAt: new Date(new Date() - (7*60*60*1000)),
            updatedAt: new Date(new Date() - (7*60*60*1000))

        })        

        
        await balances.save();
        console.log("Balances acquired at " + new Date());

        
    }).catch((error) => {
        console.log(error);
    })

};