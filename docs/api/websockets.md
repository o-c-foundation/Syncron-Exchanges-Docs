---
title: WebSocket API
sidebar_position: 6
---

# WebSocket API

The WebSocket API provides real-time data streaming for market data and account updates. WebSockets allow for a persistent connection with lower latency compared to REST API polling.

## Base WebSocket URL

```
wss://ws.syncdex.io
```

## Public Channels (No Authentication Required)

These channels provide public market data and do not require authentication:

- Market tickers
- Order book updates
- Trade streams
- Kline/candlestick updates
- Index price updates
- Funding rate updates

## Private Channels (Authentication Required)

These channels provide user-specific data and require authentication:

- Account updates
- Order updates
- Position updates
- Balance updates

## Authentication

To connect to private WebSocket channels, you need to authenticate using your API credentials. Authentication is performed by sending an authentication message after establishing the connection.

```json
{
  "method": "AUTH",
  "params": {
    "apiKey": "your_api_key",
    "timestamp": 1625097600000,
    "signature": "your_signature"
  },
  "id": 1
}
```

The signature is calculated the same way as for REST API requests. See the [Authentication](./authentication.md) section for details.

## General Message Format

All WebSocket messages follow this general structure:

```json
{
  "stream": "channel_name",
  "data": {
    // Channel-specific data
  },
  "timestamp": 1625097600000
}
```

## Connection Management

### Ping/Pong

To keep the WebSocket connection alive, you should respond to ping messages with pong messages:

```json
// Server sends ping
{
  "ping": 1625097600000
}

// Client should respond with pong
{
  "pong": 1625097600000
}
```

If you don't respond to a ping within 30 seconds, the connection will be closed.

### Connection Limits

- Maximum 5 connections per IP address
- Maximum 20 topic subscriptions per connection

## Public Channel: Market Tickers

Subscribe to real-time ticker updates for one or more trading pairs.

### Subscribe

```json
{
  "method": "SUBSCRIBE",
  "params": ["ticker@BTC-USDT", "ticker@ETH-USDT"],
  "id": 1
}
```

### Response

```json
{
  "stream": "ticker@BTC-USDT",
  "data": {
    "symbol": "BTC-USDT",
    "priceChange": "160.50",
    "priceChangePercent": "0.57",
    "lastPrice": "28160.50",
    "high": "28400.00",
    "low": "27800.00",
    "volume": "1024.35",
    "quoteVolume": "28756904.45",
    "openTime": 1625011200000,
    "closeTime": 1625097600000,
    "firstTradeId": 100000,
    "lastTradeId": 105432,
    "tradeCount": 5432
  },
  "timestamp": 1625097600000
}
```

## Public Channel: Order Book Updates

Subscribe to real-time order book updates.

### Subscribe

```json
{
  "method": "SUBSCRIBE",
  "params": ["orderbook@BTC-USDT"],
  "id": 2
}
```

### Response (Snapshot)

```json
{
  "stream": "orderbook@BTC-USDT",
  "data": {
    "type": "snapshot",
    "symbol": "BTC-USDT",
    "bids": [
      ["28150.50", "0.5"],
      ["28145.30", "1.2"],
      ["28140.10", "0.8"]
    ],
    "asks": [
      ["28160.60", "0.3"],
      ["28165.40", "0.7"],
      ["28170.20", "1.5"]
    ],
    "lastUpdateId": 12345678
  },
  "timestamp": 1625097600000
}
```

### Response (Update)

```json
{
  "stream": "orderbook@BTC-USDT",
  "data": {
    "type": "update",
    "symbol": "BTC-USDT",
    "bids": [
      ["28150.50", "0.7"],  // Updated quantity
      ["28145.30", "0"]     // Removed price level
    ],
    "asks": [
      ["28160.60", "0.5"],  // Updated quantity
      ["28155.80", "0.2"]   // New price level
    ],
    "firstUpdateId": 12345679,
    "lastUpdateId": 12345680
  },
  "timestamp": 1625097601000
}
```

## Public Channel: Trade Stream

Subscribe to real-time trade updates.

### Subscribe

```json
{
  "method": "SUBSCRIBE",
  "params": ["trades@BTC-USDT"],
  "id": 3
}
```

### Response

```json
{
  "stream": "trades@BTC-USDT",
  "data": {
    "symbol": "BTC-USDT",
    "id": 105432,
    "price": "28160.50",
    "qty": "0.02",
    "time": 1625097600000,
    "isBuyerMaker": false
  },
  "timestamp": 1625097600000
}
```

## Public Channel: Kline/Candlestick Updates

Subscribe to real-time candlestick updates.

### Subscribe

```json
{
  "method": "SUBSCRIBE",
  "params": ["kline_1m@BTC-USDT", "kline_15m@BTC-USDT"],
  "id": 4
}
```

### Response

```json
{
  "stream": "kline_1m@BTC-USDT",
  "data": {
    "symbol": "BTC-USDT",
    "interval": "1m",
    "startTime": 1625097540000,
    "endTime": 1625097599999,
    "open": "28140.10",
    "high": "28165.40",
    "low": "28135.20",
    "close": "28160.50",
    "volume": "15.23",
    "trades": 532,
    "isFinal": false
  },
  "timestamp": 1625097580000
}
```

## Public Channel: Index Price Updates

Subscribe to real-time index price updates.

### Subscribe

```json
{
  "method": "SUBSCRIBE",
  "params": ["index@BTC-USDT"],
  "id": 5
}
```

### Response

```json
{
  "stream": "index@BTC-USDT",
  "data": {
    "symbol": "BTC-USDT",
    "indexPrice": "28153.25",
    "markPrice": "28160.50",
    "fundingRate": "0.0001",
    "nextFundingTime": 1625126400000
  },
  "timestamp": 1625097600000
}
```

## Public Channel: Funding Rate Updates

Subscribe to funding rate updates for perpetual contracts.

### Subscribe

```json
{
  "method": "SUBSCRIBE",
  "params": ["funding@BTC-USDT-PERP"],
  "id": 6
}
```

### Response

```json
{
  "stream": "funding@BTC-USDT-PERP",
  "data": {
    "symbol": "BTC-USDT-PERP",
    "fundingRate": "0.0001",
    "fundingTime": 1625097600000,
    "nextFundingTime": 1625126400000,
    "predictedRate": "0.00012"
  },
  "timestamp": 1625097600000
}
```

## Private Channel: Account Updates

Subscribe to account updates after authentication.

### Subscribe

```json
{
  "method": "SUBSCRIBE",
  "params": ["account"],
  "id": 7
}
```

### Response

```json
{
  "stream": "account",
  "data": {
    "updateReason": "ORDER",
    "balances": [
      {
        "asset": "BTC",
        "free": "0.5",
        "locked": "0.1",
        "total": "0.6"
      },
      {
        "asset": "USDT",
        "free": "9500.0",
        "locked": "5000.0",
        "total": "14500.0"
      }
    ],
    "permissions": ["SPOT", "MARGIN", "FUTURES"]
  },
  "timestamp": 1625097600000
}
```

## Private Channel: Order Updates

Subscribe to order updates after authentication.

### Subscribe

```json
{
  "method": "SUBSCRIBE",
  "params": ["orders"],
  "id": 8
}
```

### Response

```json
{
  "stream": "orders",
  "data": {
    "symbol": "BTC-USDT",
    "orderId": "123456789",
    "clientOrderId": "my_order_001",
    "side": "BUY",
    "type": "LIMIT",
    "timeInForce": "GTC",
    "price": "28000.00",
    "origQty": "0.5",
    "executedQty": "0.2",
    "status": "PARTIALLY_FILLED",
    "createTime": 1625097600000,
    "updateTime": 1625097660000,
    "lastExecutedPrice": "28000.00",
    "lastExecutedQty": "0.2",
    "commissionAsset": "USDT",
    "commission": "1.12",
    "tradeId": "1234567"
  },
  "timestamp": 1625097660000
}
```

## Private Channel: Position Updates

Subscribe to position updates after authentication.

### Subscribe

```json
{
  "method": "SUBSCRIBE",
  "params": ["positions"],
  "id": 9
}
```

### Response

```json
{
  "stream": "positions",
  "data": {
    "symbol": "BTC-USDT",
    "positionSide": "LONG",
    "entryPrice": "28050.25",
    "markPrice": "28150.75",
    "positionAmt": "0.2",
    "leverage": "10",
    "unrealizedProfit": "20.10",
    "marginType": "ISOLATED",
    "isolatedMargin": "560.00",
    "liquidationPrice": "25245.22",
    "updateReason": "TRADE"
  },
  "timestamp": 1625097800000
}
```

## Unsubscribe

Unsubscribe from one or more channels.

```json
{
  "method": "UNSUBSCRIBE",
  "params": ["ticker@BTC-USDT", "trades@BTC-USDT"],
  "id": 10
}
```

## Error Codes

| Code | Description |
|------|-------------|
| -1000 | UNKNOWN_ERROR |
| -1001 | DISCONNECTED |
| -1002 | UNAUTHORIZED |
| -1003 | TOO_MANY_REQUESTS |
| -1004 | UNEXPECTED_RESPONSE |
| -1005 | TIMEOUT |
| -1006 | INVALID_REQUEST |
| -1007 | SUBSCRIPTION_FAILED |
| -1008 | CONNECTION_LIMIT_EXCEEDED |
| -1009 | SUBSCRIPTION_LIMIT_EXCEEDED |

## Best Practices

1. **Maintain a Heartbeat**: Respond to ping messages with pong to keep the connection alive.
2. **Handle Reconnection**: Implement a reconnection strategy with exponential backoff in case the connection drops.
3. **Process Order Book Updates**: For order book streams, first process the snapshot, then apply updates in sequence based on update IDs.
4. **Rate Limiting**: Respect the connection and subscription limits to avoid being rate-limited.
5. **Error Handling**: Implement proper error handling for WebSocket errors and failures.
