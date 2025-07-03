---
title: Futures Trading
sidebar_position: 3
---

# Futures Trading

Syncron offers advanced derivatives trading through its comprehensive futures platform, allowing traders to speculate on asset price movements with leverage.

## Understanding Futures Contracts

![Syncron Futures Trading](/img/syncron-futures-trading.svg)

Futures contracts on Syncron are agreements to buy or sell an asset at a predetermined price at a specified time in the future. Key characteristics include:

- **Leverage**: Trade with up to 125x leverage (asset dependent)
- **Settlement**: Cash-settled in USDT or coin-margined
- **Expiration**: Perpetual contracts with no expiry and quarterly contracts
- **Position Sides**: One-way (default) or hedge mode options
- **Risk Management**: Advanced risk controls including insurance funds

## Contract Specifications

### Perpetual Futures

Perpetual futures are the most popular derivative contracts on Syncron, allowing traders to hold positions indefinitely without expiration:

- **Funding Rate**: Paid/received every 8 hours
- **Mark Price**: Calculated from index price to prevent manipulation
- **Maximum Leverage**: 1-125x (asset dependent)
- **Maintenance Margin**: Dynamic based on position size and leverage
- **Minimum Contract Size**: Varies by asset

### Quarterly Futures

Fixed-term contracts that expire at the end of each quarter:

- **Settlement Date**: Last Friday of March, June, September, December
- **Settlement Price**: Volume-weighted average price (VWAP) of the last hour
- **Basis Trading**: Trade the spread between perpetual and quarterly contracts
- **Delivery Process**: Automatic cash settlement at expiration

## Futures Trading Interface

### Key Components

The futures trading interface includes specialized components:

1. **Contract Selection**: Choose between perpetual and quarterly contracts
2. **Leverage Slider**: Adjust position leverage from 1x to maximum allowed
3. **Margin Mode**: Cross margin (default) or isolated margin
4. **Position Information**:
   - Entry price
   - Liquidation price
   - Unrealized PnL
   - ROE (Return on Equity)
   - Margin ratio
5. **Futures Order Book**: Specialized depth visualization
6. **Futures-Specific Indicators**: Funding rate, open interest, long/short ratio

### Order Types

Syncron futures platform supports sophisticated order types:

- **Market Orders**: Execute immediately at current market price
- **Limit Orders**: Execute at specified price or better
- **Stop-Market Orders**: Market order triggered at specified price
- **Stop-Limit Orders**: Limit order triggered at specified price
- **Trailing Stop Orders**: Dynamic stop that follows price movements
- **Take Profit/Stop Loss**: Set exit conditions when placing entry orders
- **Reduce-Only Orders**: Orders that only reduce position size
- **Post-Only Orders**: Ensures order is placed as maker, not taker
- **Time-Weighted Average Price (TWAP)**: Execute large orders over time to minimize market impact

## Margin Modes

### Cross Margin

Default margin mode where your entire futures account balance serves as collateral:
- All positions share the same margin balance
- Liquidation occurs only when account equity reaches maintenance margin
- Higher capital efficiency
- Risk of total account liquidation if any position becomes underwater

### Isolated Margin

Assign specific margin to individual positions:
- Restrict losses to allocated margin amount
- Adjust margin for each position independently
- Position-specific liquidation
- Better risk control for multiple concurrent positions

## Position Modes

### One-Way Mode

Default mode allowing one position per contract:
- Single position can be either long or short
- Position size increased/decreased with additional trades
- Simplified PnL calculation and position management

### Hedge Mode

Advanced mode allowing simultaneous long and short positions on the same contract:
- Hold opposing positions simultaneously
- Implement advanced strategies like spreads
- Independent management of long and short positions
- Separate liquidation prices for each side

## Risk Management

### Liquidation Mechanics

Understanding how liquidation works is crucial for futures trading:

1. **Initial Margin**: Required to open position
2. **Maintenance Margin**: Minimum equity to keep position open
3. **Liquidation Process**:
   - Warning at 80% margin ratio
   - Partial liquidation at 90% (for large positions)
   - Full liquidation at 100%
   - Insurance fund contribution for excess losses

### Insurance Fund

Syncron maintains an insurance fund to protect traders from socialized losses:

- Absorbs negative balances from liquidated positions
- Size and utilization transparently reported daily
- Funded by liquidation fees and a portion of trading fees
- Ensures orderly market function during extreme volatility

### Risk Controls

Built-in risk management features:

- **Position Limits**: Maximum position size based on account tier
- **Price Limits**: Maximum price change limits to prevent flash crashes
- **Auto-Deleveraging (ADL) Queue**: System for handling extreme market conditions
- **Mark Price Mechanisms**: Prevents manipulation-based liquidations
- **Liquidation Circuit Breakers**: Prevent cascading liquidation events

## Advanced Futures Strategies

### Basis Trading

Capitalize on the price difference between spot and futures markets:

1. Take opposing positions in spot and futures markets
2. Profit from convergence at settlement
3. Typically low-risk with predictable returns
4. Calculate implied annual percentage yield (APY)

### Funding Rate Arbitrage

Strategy based on the 8-hour funding rate mechanism:

1. Take position opposite to market sentiment
2. Collect funding payments while maintaining delta-neutral exposure
3. Manage position to minimize directional risk
4. Calculate expected return vs. position costs

### Market Making

Provide liquidity to earn rebates and capture the spread:

1. Place limit orders on both sides of the order book
2. Manage inventory risk with dynamic hedge ratios
3. Utilize post-only orders to ensure maker fees
4. Implement advanced execution algorithms

## Portfolio Margin

For qualified traders, Syncron offers portfolio margining benefits:

- **Cross-Collateralization**: Use diverse assets as collateral
- **Risk Offsetting**: Reduced margin requirements for hedged positions
- **Comprehensive Risk Calculation**: VaR-based approach to margin requirements
- **Eligibility**: Available to accounts with >$100,000 equity and good trading history

## Futures Analytics

Advanced analytical tools for futures traders:

- **Funding Rate History**: Historical funding payments visualization
- **Open Interest Analysis**: Market participation metrics
- **Long/Short Ratio**: Market sentiment indicator
- **Liquidation Heatmap**: Visual representation of liquidation clusters
- **Position Cost Distribution**: Market structure analysis
- **Futures Basis Charts**: Spot-futures spread visualization
- **Futures Term Structure**: Visualize contango/backwardation across expirations

## API Trading

All futures functionality is accessible via API for algorithmic trading:

- Place and manage futures orders
- Monitor positions and account state
- Stream real-time market data
- Implement automated trading strategies

See the [API Documentation](/docs/syncron/api/futures) for implementation details.

## Mobile Trading

The full suite of futures trading tools is available in the Syncron mobile app:

- Complete feature parity with web platform
- Position monitoring notifications
- Liquidation alerts
- Quick position adjustment tools
- Mobile-optimized charting

## Educational Resources

Syncron provides comprehensive educational materials for futures traders:

1. **Futures Trading Course**: Step-by-step video tutorials
2. **Liquidation Calculator**: Simulate scenarios to understand risk
3. **Trading Simulator**: Practice without risking real funds
4. **Strategy Guides**: Documentation of proven futures strategies
5. **Webinars**: Regular expert-led sessions on futures trading

Visit the [Syncron Academy](/docs/syncron/academy/futures) to access these resources.

## Risk Disclosure

Futures trading involves significant risk:

- Leverage amplifies both gains and losses
- Market volatility can lead to rapid liquidations
- Past performance is not indicative of future results
- Only trade with capital you can afford to lose
- Full understanding of mechanics is essential before trading

Syncron recommends starting with small position sizes and lower leverage until you gain experience with the futures platform.
