import { Schema, model } from "mongoose";

const BalancesSchema = new Schema(
    {
        securities_account: {
            
                account_type: {
                    type: String
                },
                account_id: {
                    type: String
                },
                round_trips: {
                    type: Number
                },
                is_day_trader: {
                    type: Boolean
                },
                is_closing_only_restricted: {
                    type: Boolean
                },
                initial_balances: {

                    accrued_interest: {
                        type: Number
                    },
                    available_funds_non_marginable_trade: {
                        type: Number
                    },
                    bond_value: {
                        type: Number
                    },
                    buying_power: {
                        type: Number
                    },
                    cash_balance: {
                        type: Number
                    },
                    cash_available_for_trading: {
                        type: Number
                    },
                    cash_receipts: {
                        type: Number
                    },
                    day_trading_buying_power: {
                        type: Number
                    },
                    day_trading_buying_power_call: {
                        type: Number
                    },
                    day_trading_equity_call: {
                        type: Number
                    },
                    equity: {
                        type: Number
                    },
                    equity_percentage: {
                        type: Number
                    },
                    liquidation_value: {
                        type: Number
                    },
                    long_margin_value: {
                        type: Number
                    },
                    long_option_market_value: {
                        type: Number
                    },
                    long_stock_value: {
                        type: Number
                    },
                    maintenance_call: {
                        type: Number
                    },
                    maintenance_requirement: {
                        type: Number
                    },
                    margin: {
                        type: Number
                    },
                    margin_equity: {
                        type: Number
                    },
                    money_market_fund: {
                        type: Number
                    },
                    mutual_fund_value: {
                        type: Number
                    },
                    reg_t_call: {
                        type: Number
                    },
                    short_margin_value: {
                        type: Number
                    },
                    short_option_market_value: {
                        type: Number
                    },
                    short_stock_value: {
                        type: Number
                    },
                    total_cash: {
                        type: Number
                    },
                    is_in_call: {
                        type: Boolean
                    },
                    pending_deposits: {
                        type: Number
                    },
                    margin_balance: {
                        type: Number
                    },
                    short_balance: {
                        type: Number
                    },
                    account_value: {
                        type: Number
                    }
            },
            current_balances: {
                    accrued_interest: {
                        type: Number
                    },
                    cash_balance: {
                        type: Number
                    },
                    cash_receipts: {
                        type: Number
                    },
                    long_option_market_value: {
                        type: Number
                    },
                    liquidation_value: {
                        type: Number
                    },
                    longMarket_value: {
                        type: Number
                    },
                    moneyMarket_fund: {
                        type: Number
                    },
                    savings: {
                        type: Number
                    },
                    short_market_value: {
                        type: Number
                    },
                    pending_deposits: {
                        type: Number
                    },
                    available_funds: {
                        type: Number
                    },
                    available_funds_non_marginable_trade: {
                        type: Number
                    },
                    buying_power: {
                        type: Number
                    },
                    buying_power_non_marginable_trade: {
                        type: Number
                    },
                    day_trading_buying_power: {
                        type: Number
                    },
                    equity: {
                        type: Number
                    },
                    equity_percentage: {
                        type: Number
                    },
                    long_margin_value: {
                        type: Number
                    },
                    maintenance_call: {
                        type: Number
                    },
                    maintenance_requirement: {
                        type: Number
                    },
                    margin_balance: {
                        type: Number
                    },
                    reg_t_call: {
                        type: Number
                    },
                    short_balance: {
                        type: Number
                    },
                    short_margin_value: {
                        type: Number
                    },
                    short_option_market_value: {
                        type: Number
                    },
                    sma: {
                        type: Number
                    },
                    mutual_fund_value: {
                        type: Number
                    },
                    bond_value: {
                        type: Number
                    }               
            },
            projected_balances: {
                    available_funds: {
                        type: Number
                    },
                    available_funds_non_marginable_trade: {
                        type: Number
                    },
                    buying_power: {
                        type: Number
                    },
                    day_trading_buying_power: {
                        type: Number
                    },
                    day_trading_buying_power_call: {
                        type: Number
                    },
                    maintenance_call: {
                        type: Number
                    },
                    reg_t_call: {
                        type: Number
                    },
                    is_in_call: {
                        type: Boolean
                    },
                    stock_buying_power: {
                        type: Number
                    }            
        }
    },
    createdAt: Date,
    updatedAt: Date,
    },
);

const Balances = model('Balances', BalancesSchema);

export default Balances;
