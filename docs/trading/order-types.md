---
title: Order Types
sidebar_position: 2
---

# Order Types on SyncDex

SyncDex offers a variety of order types to suit different trading strategies. This guide explains each order type in detail and when to use them.

## Basic Order Types

### Market Orders

Market orders execute immediately at the current best available price in the order book.

**When to use**: When you want immediate execution and price certainty is less important than execution speed.

**Advantages**:
- Guaranteed execution (as long as there's liquidity)
- Immediate fulfillment
- No need to monitor the market for execution

**Disadvantages**:
- No control over execution price
- May experience slippage in volatile or low-liquidity markets
- Usually incurs higher fees (taker fees)

**Example**:
If ETH is trading at approximately $3,000, a market buy order for 1 ETH will execute immediately, purchasing 1 ETH at the best available price (which could be $3,001, $3,005, etc. depending on the order book).

### Limit Orders

Limit orders allow you to set a specific price at which you want to buy or sell an asset.

**When to use**: When you have a target price in mind and are willing to wait for the market to reach that price.

**Advantages**:
- Control over execution price
- Usually lower fees (maker fees)
- Can capitalize on specific price levels

**Disadvantages**:
- No guarantee of execution if the market doesn't reach your price
- May miss opportunities if price moves strongly in your favor without hitting your limit

**Example**:
If ETH is trading at $3,000, you can set a limit buy order at $2,900 to purchase if the price drops, or a limit sell order at $3,100 to sell if the price rises.

## Risk Management Orders

### Stop Loss Orders

A stop loss order is designed to limit your loss on a position. It becomes a market order when the asset reaches a specified price.

**When to use**: To protect against significant losses in an open position.

**Advantages**:
- Automatically limits downside risk
- Doesn't require constant monitoring
- Helps maintain trading discipline

**Disadvantages**:
- Can be triggered by temporary price wicks
- Execution price may be worse than stop price due to slippage
- Not effective in gap markets or extreme volatility

**Example**:
If you buy ETH at $3,000, you might set a stop loss at $2,850 to limit your loss to 5%.

### Take Profit Orders

A take profit order automatically closes your position when the price reaches a profitable target.

**When to use**: To secure profits without constantly monitoring the market.

**Advantages**:
- Locks in profits at your target
- Eliminates emotion from the selling decision
- Doesn't require constant monitoring

**Disadvantages**:
- Limits potential upside if the asset continues in your favor
- May not execute exactly at the specified price due to market conditions

**Example**:
If you buy ETH at $3,000, you might set a take profit order at $3,300 to secure a 10% gain.

## Advanced Order Types

### Stop-Limit Orders

A combination of stop and limit orders. When the stop price is triggered, it creates a limit order instead of a market order.

**When to use**: When you want to control both the trigger price and the execution price.

**Advantages**:
- More control over execution price than a regular stop order
- Helps prevent execution at unexpected prices during high volatility

**Disadvantages**:
- More complex to set up
- May not execute at all if the limit price isn't met after the stop is triggered

**Example**:
You can set a stop-limit sell order with a stop price of $2,900 and a limit price of $2,880. If ETH drops to $2,900, a limit sell order at $2,880 is created.

### Trailing Stop Orders

A dynamic stop loss that moves with the market price when it moves in your favor, but stays in place when the market moves against you.

**When to use**: To protect profits while still allowing room for upside potential.

**Advantages**:
- Automatically adjusts to lock in more profit as the price moves favorably
- Doesn't require manual adjustment
- Allows you to capture trends without precise exit timing

**Disadvantages**:
- Can be triggered by normal market volatility
- May trail too closely or too distantly depending on settings

**Example**:
You can set a trailing stop 5% below the market price. If ETH rises from $3,000 to $3,200, your stop would move from $2,850 to $3,040, locking in more profit.

### OCO (One-Cancels-Other) Orders

Combines a limit order with a stop order. When one gets executed, the other is automatically canceled.

**When to use**: When you want to set both a take profit and stop loss simultaneously.

**Advantages**:
- Simplifies managing both profit targets and risk management
- Ensures you don't forget to set either component
- Automatically handles order cancellation

**Disadvantages**:
- More complex to configure properly
- Both parts must be carefully considered

**Example**:
After buying ETH at $3,000, you could set an OCO with a take profit limit at $3,300 and a stop loss at $2,850. If either price is hit, that order executes and the other cancels.

### TWAP (Time-Weighted Average Price) Orders

Breaks a large order into smaller pieces executed at regular time intervals.

**When to use**: When executing large orders to minimize market impact.

**Advantages**:
- Reduces market impact for large trades
- Helps achieve an average price close to the market average
- Automated execution over your specified timeframe

**Disadvantages**:
- Execution may take hours or days
- Market may move significantly during execution period

**Example**:
Instead of buying 100 ETH at once (which could move the market), you can set a TWAP to buy 5 ETH every 15 minutes over 5 hours.

## Order Modifiers

### Fill or Kill (FOK)

The order must be filled immediately and completely or not at all.

### Good 'til Canceled (GTC)

The order remains active until manually canceled or the position is filled.

### Immediate or Cancel (IOC)

The order must execute immediately, and any portion that cannot be filled is canceled.

### Post Only

Ensures your order is posted to the order book as a maker order and is not matched immediately as a taker order.

## Best Practices

- **Beginners**: Start with market and simple limit orders until comfortable with the platform
- **Test with small amounts**: Experiment with advanced order types using minimal capital
- **Combine order types**: Use strategies like OCO orders for comprehensive risk management
- **Monitor open orders**: Regularly review any open orders to ensure they still align with your strategy
- **Consider market conditions**: Different order types perform differently in various market conditions
