---
title: Spot Trading
sidebar_position: 6
---

# Spot Trading API

The Spot Trading API allows you to place and manage spot market orders on Syncron Exchange. This includes creating orders, checking order status, canceling orders, and viewing trade history.

<!-- Image placeholder for Spot Trading API -->

## Authentication

All spot trading endpoints require authentication with API keys that have trading permissions. See the [Authentication](/docs/syncron/api/authentication) section for details on how to authenticate your requests.

## Order Types

Syncron supports the following order types for spot trading:

### LIMIT

Limit orders will be executed at the price specified or better. They can be filled at multiple price levels, up to the limit price.

**Required parameters:**
- `symbol`: Trading pair symbol
- `side`: BUY or SELL
- `type`: LIMIT
- `timeInForce`: GTC (Good Till Canceled), IOC (Immediate or Cancel), or FOK (Fill or Kill)
- `quantity`: Amount of the base asset
- `price`: Price at which to execute the order

### MARKET

Market orders will be executed immediately at the best available price in the order book.

**Required parameters:**
- `symbol`: Trading pair symbol
- `side`: BUY or SELL
- `type`: MARKET
- `quantity` or `quoteOrderQty`: Amount of the base asset (quantity) or quote asset (quoteOrderQty)

### STOP_LOSS

Stop Loss orders will be executed as MARKET orders when the last price reaches or exceeds the `stopPrice`.

**Required parameters:**
- `symbol`: Trading pair symbol
- `side`: BUY or SELL
- `type`: STOP_LOSS
- `quantity`: Amount of the base asset
- `stopPrice`: Trigger price for the order

### STOP_LOSS_LIMIT

Stop Loss Limit orders will be executed as LIMIT orders when the last price reaches or exceeds the `stopPrice`.

**Required parameters:**
- `symbol`: Trading pair symbol
- `side`: BUY or SELL
- `type`: STOP_LOSS_LIMIT
- `timeInForce`: GTC, IOC, or FOK
- `quantity`: Amount of the base asset
- `price`: Price at which to execute the order
- `stopPrice`: Trigger price for the order

### TAKE_PROFIT

Take Profit orders will be executed as MARKET orders when the last price reaches or exceeds the `stopPrice`.

**Required parameters:**
- `symbol`: Trading pair symbol
- `side`: BUY or SELL
- `type`: TAKE_PROFIT
- `quantity`: Amount of the base asset
- `stopPrice`: Trigger price for the order

### TAKE_PROFIT_LIMIT

Take Profit Limit orders will be executed as LIMIT orders when the last price reaches or exceeds the `stopPrice`.

**Required parameters:**
- `symbol`: Trading pair symbol
- `side`: BUY or SELL
- `type`: TAKE_PROFIT_LIMIT
- `timeInForce`: GTC, IOC, or FOK
- `quantity`: Amount of the base asset
- `price`: Price at which to execute the order
- `stopPrice`: Trigger price for the order

### LIMIT_MAKER

LIMIT_MAKER orders will be rejected if they would immediately match and trade as a taker.

**Required parameters:**
- `symbol`: Trading pair symbol
- `side`: BUY or SELL
- `type`: LIMIT_MAKER
- `quantity`: Amount of the base asset
- `price`: Price at which to execute the order

## Order Endpoints

### Test New Order

```
POST https://v3.syncron.network/api/spot/order/test
```

Test new order creation without actually placing an order. Validates parameters and checks balance.

**Parameters:** Same as for creating a new order

**Response Example:**
```json
{
  "success": true
}
```

### Place New Order

```
POST https://v3.syncron.network/api/spot/order
```

Place a new spot order on the exchange.

**Authentication Required:** API Key with TRADE permission

**Parameters:**
- `symbol` (required): Trading pair symbol (e.g., BTC-USDT)
- `side` (required): BUY or SELL
- `type` (required): Order type (LIMIT, MARKET, STOP_LOSS, etc.)
- `timeInForce` (conditional): Required for LIMIT orders (GTC, IOC, FOK)
- `quantity` (conditional): Required except for MARKET orders with quoteOrderQty
- `quoteOrderQty` (conditional): Required for MARKET orders when quantity is not specified
- `price` (conditional): Required for LIMIT orders
- `newClientOrderId` (optional): Client-generated order ID
- `stopPrice` (conditional): Required for STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, and TAKE_PROFIT_LIMIT orders
- `icebergQty` (optional): Used to create an iceberg order

**Response Example:**
```json
{
  "success": true,
  "data": {
    "orderId": 12345678,
    "symbol": "BTC-USDT",
    "status": "NEW",
    "clientOrderId": "my_order_id_123",
    "price": "30200.00",
    "origQty": "0.5",
    "executedQty": "0",
    "cummulativeQuoteQty": "0",
    "type": "LIMIT",
    "side": "BUY",
    "timeInForce": "GTC",
    "stopPrice": "0",
    "icebergQty": "0",
    "time": 1626954321000,
    "updateTime": 1626954321000,
    "isWorking": true,
    "origQuoteOrderQty": "0"
  }
}
```

### Cancel Order

```
DELETE https://v3.syncron.network/api/spot/order
```

Cancel an existing order.

**Authentication Required:** API Key with TRADE permission

**Parameters:**
- `symbol` (required): Trading pair symbol
- Either `orderId` or `clientOrderId` required

**Response Example:**
```json
{
  "success": true,
  "data": {
    "orderId": 12345678,
    "symbol": "BTC-USDT",
    "status": "CANCELED",
    "clientOrderId": "my_order_id_123",
    "price": "30200.00",
    "origQty": "0.5",
    "executedQty": "0",
    "cummulativeQuoteQty": "0",
    "type": "LIMIT",
    "side": "BUY",
    "timeInForce": "GTC"
  }
}
```

### Cancel All Orders

```
DELETE https://v3.syncron.network/api/spot/openOrders
```

Cancel all active orders on a symbol.

**Authentication Required:** API Key with TRADE permission

**Parameters:**
- `symbol` (required): Trading pair symbol

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "orderId": 12345678,
      "symbol": "BTC-USDT",
      "status": "CANCELED"
    },
    {
      "orderId": 12345679,
      "symbol": "BTC-USDT",
      "status": "CANCELED"
    }
  ]
}
```

### Query Order

```
GET https://v3.syncron.network/api/spot/order
```

Check the status of an order.

**Authentication Required:** API Key with READ permission

**Parameters:**
- `symbol` (required): Trading pair symbol
- Either `orderId` or `clientOrderId` required

**Response Example:**
```json
{
  "success": true,
  "data": {
    "orderId": 12345678,
    "symbol": "BTC-USDT",
    "status": "FILLED",
    "clientOrderId": "my_order_id_123",
    "price": "30200.00",
    "origQty": "0.5",
    "executedQty": "0.5",
    "cummulativeQuoteQty": "15100.00",
    "type": "LIMIT",
    "side": "BUY",
    "timeInForce": "GTC",
    "time": 1626954321000,
    "updateTime": 1626954351000,
    "isWorking": true,
    "fills": [
      {
        "price": "30200.00",
        "qty": "0.5",
        "commission": "15.10",
        "commissionAsset": "USDT"
      }
    ]
  }
}
```

### Get Open Orders

```
GET https://v3.syncron.network/api/spot/openOrders
```

Get all open orders for a symbol or all symbols.

**Authentication Required:** API Key with READ permission

**Parameters:**
- `symbol` (optional): Trading pair symbol

**Response Example:**
```json
{
  "success": true,
  "data": [
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
      "time": 1626954321000,
      "updateTime": 1626954321000
    },
    {
      "orderId": 12345679,
      "symbol": "ETH-USDT",
      "status": "PARTIALLY_FILLED",
      "clientOrderId": "my_order_id_124",
      "price": "1800.00",
      "origQty": "2.0",
      "executedQty": "0.5",
      "type": "LIMIT",
      "side": "BUY",
      "timeInForce": "GTC",
      "time": 1626954322000,
      "updateTime": 1626954325000
    }
  ]
}
```

### Get All Orders

```
GET https://v3.syncron.network/api/spot/allOrders
```

Get all orders for a symbol: active, canceled, or filled.

**Authentication Required:** API Key with READ permission

**Parameters:**
- `symbol` (required): Trading pair symbol
- `orderId` (optional): Return orders with order ID ≥ this value
- `startTime` (optional): Return orders with time ≥ this value
- `endTime` (optional): Return orders with time ≤ this value
- `limit` (optional): Number of orders to return (default: 500, max: 1000)

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "orderId": 12345678,
      "symbol": "BTC-USDT",
      "status": "FILLED",
      "clientOrderId": "my_order_id_123",
      "price": "30200.00",
      "origQty": "0.5",
      "executedQty": "0.5",
      "cummulativeQuoteQty": "15100.00",
      "type": "LIMIT",
      "side": "BUY",
      "timeInForce": "GTC",
      "time": 1626954321000,
      "updateTime": 1626954351000
    },
    {
      "orderId": 12345680,
      "symbol": "BTC-USDT",
      "status": "CANCELED",
      "clientOrderId": "my_order_id_125",
      "price": "29800.00",
      "origQty": "0.3",
      "executedQty": "0",
      "cummulativeQuoteQty": "0",
      "type": "LIMIT",
      "side": "BUY",
      "timeInForce": "GTC",
      "time": 1626954400000,
      "updateTime": 1626954450000
    }
  ]
}
```

### Account Information

```
GET https://v3.syncron.network/api/spot/account
```

Get current account information including balances for all assets.

**Authentication Required:** API Key with READ permission

**Parameters:** None

**Response Example:**
```json
{
  "success": true,
  "data": {
    "makerCommission": 10,
    "takerCommission": 10,
    "buyerCommission": 0,
    "sellerCommission": 0,
    "canTrade": true,
    "canWithdraw": true,
    "canDeposit": true,
    "updateTime": 1626954600000,
    "accountType": "SPOT",
    "balances": [
      {
        "asset": "BTC",
        "free": "1.23456789",
        "locked": "0.5"
      },
      {
        "asset": "USDT",
        "free": "45678.90",
        "locked": "15100.00"
      },
      {
        "asset": "ETH",
        "free": "12.3456",
        "locked": "0"
      }
    ],
    "permissions": ["SPOT", "MARGIN"]
  }
}
```

### Account Trade List

```
GET https://v3.syncron.network/api/spot/myTrades
```

Get trades for a specific account and symbol.

**Authentication Required:** API Key with READ permission

**Parameters:**
- `symbol` (required): Trading pair symbol
- `orderId` (optional): Filter by order ID
- `startTime` (optional): Filter by time ≥ this value
- `endTime` (optional): Filter by time ≤ this value
- `fromId` (optional): Trade ID to fetch from (inclusive)
- `limit` (optional): Number of trades to return (default: 500, max: 1000)

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "id": 28457,
      "symbol": "BTC-USDT",
      "orderId": 12345678,
      "price": "30200.00",
      "qty": "0.5",
      "quoteQty": "15100.00",
      "commission": "15.10",
      "commissionAsset": "USDT",
      "time": 1626954351000,
      "isBuyer": true,
      "isMaker": false,
      "isBestMatch": true
    },
    {
      "id": 28458,
      "symbol": "BTC-USDT",
      "orderId": 12345681,
      "price": "30300.00",
      "qty": "0.2",
      "quoteQty": "6060.00",
      "commission": "6.06",
      "commissionAsset": "USDT",
      "time": 1626955000000,
      "isBuyer": false,
      "isMaker": true,
      "isBestMatch": true
    }
  ]
}
```

### User Data Stream

The User Data Stream allows you to receive real-time updates on your account and orders via WebSocket connection.

#### Start User Stream

```
POST https://v3.syncron.network/api/spot/userDataStream
```

Start a new user data stream to receive WebSocket updates. Returns a listen key that can be used to establish a WebSocket connection.

**Authentication Required:** API Key

**Parameters:** None

**Response Example:**
```json
{
  "success": true,
  "data": {
    "listenKey": "pqia91ma19a5s61cv6a81va65sdf19v8a65a1a5s61cv6a81va65sdf19v8a65a1"
  }
}
```

#### Keep-alive User Stream

```
PUT https://v3.syncron.network/api/spot/userDataStream
```

Keep the user data stream active. It's recommended to send a ping every 30 minutes to keep the stream alive.

**Authentication Required:** API Key

**Parameters:**
- `listenKey` (required): The listen key obtained from the start user stream endpoint

**Response Example:**
```json
{
  "success": true
}
```

#### Close User Stream

```
DELETE https://v3.syncron.network/api/spot/userDataStream
```

Close a user data stream.

**Authentication Required:** API Key

**Parameters:**
- `listenKey` (required): The listen key to close

**Response Example:**
```json
{
  "success": true
}
```

### WebSocket User Data Stream Events

After obtaining a listen key, connect to the WebSocket endpoint:

```
wss://v3.syncron.network/ws/<listenKey>
```

You will receive the following event types:

#### Account Update Event

Sent when your account balance changes.

```json
{
  "e": "outboundAccountPosition", // Event type
  "E": 1626954700000,            // Event time
  "u": 1,                        // Last update time
  "B": [                         // Balances array
    {
      "a": "BTC",                // Asset
      "f": "1.23456789",         // Free amount
      "l": "0.5"                 // Locked amount
    },
    {
      "a": "USDT",
      "f": "45678.90",
      "l": "15100.00"
    }
  ]
}
```

#### Order Update Event

Sent when an order status changes.

```json
{
  "e": "executionReport",        // Event type
  "E": 1626954720000,            // Event time
  "s": "BTC-USDT",               // Symbol
  "c": "my_order_id_123",        // Client order ID
  "S": "BUY",                    // Side
  "o": "LIMIT",                  // Order type
  "f": "GTC",                    // Time in force
  "q": "0.5",                    // Original quantity
  "p": "30200.00",               // Price
  "P": "0",                      // Stop price
  "F": "0",                      // Iceberg quantity
  "g": -1,                       // Order list id
  "C": "",                       // Original client order ID
  "x": "TRADE",                  // Current execution type
  "X": "FILLED",                 // Current order status
  "r": "NONE",                   // Order reject reason
  "i": 12345678,                 // Order ID
  "l": "0.5",                    // Last executed quantity
  "z": "0.5",                    // Cumulative filled quantity
  "L": "30200.00",               // Last executed price
  "n": "15.10",                  // Commission
  "N": "USDT",                   // Commission asset
  "T": 1626954720000,            // Transaction time
  "t": 28457,                    // Trade ID
  "I": 567890123,                // Ignore
  "w": false,                    // Is working
  "m": false,                    // Is this trade the maker side?
  "M": true,                     // Ignore
  "O": 1626954321000,            // Order creation time
  "Z": "15100.00"                // Cumulative quote asset transacted quantity
}
```

## Error Codes

Here are common error codes you may encounter when using the Spot Trading API:

| Code | Message | Description |
|------|---------|-------------|
| 400  | INVALID_PARAMETER | One or more parameters were invalid |
| 401  | UNAUTHORIZED | API key missing or invalid |
| 403  | FORBIDDEN | API key doesn't have permission |
| 404  | ORDER_NOT_FOUND | The requested order doesn't exist |
| 409  | INSUFFICIENT_BALANCE | Insufficient balance to complete the order |
| 429  | TOO_MANY_REQUESTS | Rate limit exceeded |
| 500  | INTERNAL_ERROR | Internal server error |

## Rate Limits

- Standard API call rate limit: 1200 requests per minute per IP
- Order placement/cancellation: 100 requests per second per account
- Aggressive order placement may result in auto-ban for a period of time

For high-frequency trading, please contact Syncron support to request increased limits.
