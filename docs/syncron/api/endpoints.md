---
title: API Endpoints
sidebar_position: 2
---

# Syncron API Endpoints

This document provides a comprehensive listing of all available API endpoints in the Syncron trading platform.

![Syncron API Endpoints](/img/syncron-api-endpoints.svg)

## Endpoint Structure

All Syncron API endpoints follow this base URL format:

```
https://api.syncron.finance/v1/{endpoint}
```

For WebSocket connections:

```
wss://stream.syncron.finance/v1
```

## Authentication Requirements

Endpoints are categorized by authentication requirements:

- **Public**: No authentication required
- **User**: Requires API key with `read` permissions
- **Trade**: Requires API key with `trade` permissions
- **Withdraw**: Requires API key with `withdraw` permissions
- **Admin**: Reserved for admin-level operations (not available via public API)

## Market Data Endpoints

### Get Ticker Information

```
GET /market/ticker
```

Returns 24-hour price change statistics for all trading pairs.

**Parameters:**
- `symbol` (optional): Trading pair symbol (e.g., BTC-USDT)

**Response Example:**
```json
{
  "symbol": "BTC-USDT",
  "price": "30241.50",
  "priceChange": "342.50",
  "priceChangePercent": "1.15",
  "highPrice": "30500.00",
  "lowPrice": "29850.20",
  "volume": "2541.32",
  "quoteVolume": "76542312.45",
  "openTime": 1626825600000,
  "closeTime": 1626912000000
}
```

### Get Order Book

```
GET /market/orderbook
```

Returns current order book for a symbol.

**Parameters:**
- `symbol` (required): Trading pair symbol
- `limit` (optional): Number of bids/asks to return (default: 100, max: 5000)

**Response Example:**
```json
{
  "lastUpdateId": 1627454312,
  "bids": [
    ["30241.50", "1.25"],
    ["30240.10", "0.75"],
    ["30239.80", "2.10"]
  ],
  "asks": [
    ["30242.10", "0.85"],
    ["30243.20", "1.50"],
    ["30245.00", "3.25"]
  ]
}
```

### Get Recent Trades

```
GET /market/trades
```

Returns recent trades for a symbol.

**Parameters:**
- `symbol` (required): Trading pair symbol
- `limit` (optional): Number of trades to return (default: 500, max: 1000)

### Get Kline/Candlestick Data

```
GET /market/klines
```

Returns candlestick data for a symbol.

**Parameters:**
- `symbol` (required): Trading pair symbol
- `interval` (required): Candlestick interval (1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M)
- `startTime` (optional): Start time in milliseconds
- `endTime` (optional): End time in milliseconds
- `limit` (optional): Number of candles to return (default: 500, max: 1000)

## Account Endpoints

### Get Account Information

```
GET /account/info
```

Returns account information including balances, permissions, and account type.

**Authentication Required:** User

**Response Example:**
```json
{
  "accountType": "spot",
  "balances": [
    {
      "asset": "BTC",
      "free": "0.15000000",
      "locked": "0.05000000"
    },
    {
      "asset": "USDT",
      "free": "1250.00000000",
      "locked": "0.00000000"
    }
  ],
  "permissions": ["spot", "margin", "futures"],
  "commissionTier": 2,
  "takerCommission": "0.001",
  "makerCommission": "0.0008"
}
```

### Get Deposit History

```
GET /account/deposits
```

Returns deposit history.

**Authentication Required:** User

**Parameters:**
- `asset` (optional): Filter by asset
- `status` (optional): Filter by status (0: pending, 1: success, 2: failed)
- `startTime` (optional): Start time in milliseconds
- `endTime` (optional): End time in milliseconds
- `limit` (optional): Number of records to return (default: 20, max: 100)

### Get Withdrawal History

```
GET /account/withdrawals
```

Returns withdrawal history.

**Authentication Required:** User

**Parameters:**
- Similar to deposit history endpoint

## Trading Endpoints

### Place New Order

```
POST /trading/order
```

Places a new order.

**Authentication Required:** Trade

**Parameters:**
- `symbol` (required): Trading pair symbol
- `side` (required): BUY or SELL
- `type` (required): Order type (LIMIT, MARKET, STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, TAKE_PROFIT_LIMIT, LIMIT_MAKER)
- `timeInForce` (conditional): Required for LIMIT orders (GTC, IOC, FOK)
- `quantity` (conditional): Required except for MARKET orders with quoteOrderQty
- `price` (conditional): Required for LIMIT orders
- `newClientOrderId` (optional): Client-generated order ID
- Additional parameters for specific order types

**Response Example:**
```json
{
  "orderId": 12345678,
  "symbol": "BTC-USDT",
  "status": "NEW",
  "clientOrderId": "my_order_id_123",
  "price": "30200.00",
  "origQty": "0.5",
  "executedQty": "0",
  "type": "LIMIT",
  "side": "BUY",
  "timeInForce": "GTC",
  "transactTime": 1626954321000
}
```

### Cancel Order

```
DELETE /trading/order
```

Cancels an existing order.

**Authentication Required:** Trade

**Parameters:**
- `symbol` (required): Trading pair symbol
- Either `orderId` or `clientOrderId` required

### Get Order Status

```
GET /trading/order
```

Retrieves order status.

**Authentication Required:** User

**Parameters:**
- `symbol` (required): Trading pair symbol
- Either `orderId` or `clientOrderId` required

### Get Open Orders

```
GET /trading/openOrders
```

Retrieves all open orders.

**Authentication Required:** User

**Parameters:**
- `symbol` (optional): Trading pair symbol

## Margin Trading Endpoints

For detailed documentation on margin trading API, see [Margin Trading API](/docs/syncron/api/margin).

### Margin Account Endpoints

```
GET /api/v3/margin/account
```
Retrieves the user's margin account information including assets, borrowed amounts, interest rates, and account health.

```
GET /api/v3/margin/balance
```
Retrieves the balance details for a specific asset in the user's margin account.

```
POST /api/v3/margin/transfer
```
Transfers funds between your margin account and spot account.

```
GET /api/v3/margin/maxBorrowable
```
Queries the maximum amount of an asset that can be borrowed.

```
GET /api/v3/margin/maxTransferable
```
Queries the maximum amount of an asset that can be transferred from spot account to margin account.

### Margin Loan Endpoints

```
POST /api/v3/margin/loan
```
Apply for a loan in a margin account.

```
GET /api/v3/margin/loan
```
Query loan records.

```
POST /api/v3/margin/repay
```
Repay a loan in a margin account.

```
GET /api/v3/margin/repay
```
Query repayment records.

### Margin Trading Endpoints

```
POST /api/v3/margin/order/test
```
Test a new margin order creation without actually placing it.

```
POST /api/v3/margin/order
```
Places a new order for margin trading.

```
DELETE /api/v3/margin/order
```
Cancel an active margin order.

```
DELETE /api/v3/margin/openOrders
```
Cancels all active orders on a symbol for margin account.

```
GET /api/v3/margin/order
```
Check an order's status in the margin account.

```
GET /api/v3/margin/openOrders
```
Get all open margin orders on a symbol.

```
GET /api/v3/margin/allOrders
```
Get all margin account orders; active, canceled, or filled.

```
GET /api/v3/margin/myTrades
```
Get trades for a specific margin account and symbol.

### Interest Rate & Liquidation Endpoints

```
GET /api/v3/margin/interestRate
```
Get the interest rate and quota for the margin assets.

```
GET /api/v3/margin/forceLiquidationRec
```
Get forced liquidation record.

```
GET /api/v3/margin/collateralRatio
```
Get current margin collateral ratio information.

## Futures Trading Endpoints

### Get Futures Account Information

```
GET /futures/account
```

Returns futures account information.

**Authentication Required:** User

### Place Futures Order

```
POST /futures/order
```

Places a new futures order.

**Authentication Required:** Trade

**Parameters:**
- Similar to spot trading with additional futures-specific parameters

## WebSocket Streams

### Market Streams

- `/ws/{symbol}@ticker`: 24hr ticker statistics for a symbol
- `/ws/{symbol}@depth`: Order book depth for a symbol
- `/ws/{symbol}@trade`: Real-time trades for a symbol
- `/ws/{symbol}@kline_{interval}`: Kline/candlestick data for a symbol

### User Data Streams

- `/ws/user`: Account updates, order updates, balance updates (requires listen key)

## Error Codes

| Code | Description |
|------|-------------|
| 1000 | Unknown error |
| 1001 | Disconnected |
| 1002 | Unauthorized |
| 1003 | Too many requests |
| 1004 | Unexpected server error |
| 1005 | Invalid request format |
| 1006 | Invalid parameter |
| 1007 | Order would trigger immediate liquidation |
| 1008 | Account has insufficient balance |
| 1009 | Market is closed |
| 1010 | Order would trigger risk management filter |

## Rate Limits

Syncron implements tiered rate limiting based on account level:

| Account Level | Requests per Minute | Orders per Second |
|---------------|---------------------|------------------|
| Standard      | 1,200               | 10               |
| Silver        | 2,400               | 15               |
| Gold          | 3,600               | 20               |
| Platinum      | 6,000               | 30               |
| VIP           | Custom              | Custom           |

Rate limits are categorized by endpoint groups and apply differently to each group.

For more detailed API documentation, including full request and response schemas, error handling, and examples, please consult our [API Reference](/docs/syncron/api/reference) section.
