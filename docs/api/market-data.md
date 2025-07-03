---
title: Market Data API
sidebar_position: 3
---

# Market Data API

The Market Data API provides access to SyncDex's real-time and historical market information.

## Endpoints Overview

| Endpoint | Description |
|----------|-------------|
| GET /api/v1/markets | List all available markets |
| GET /api/v1/ticker | 24-hour price statistics |
| GET /api/v1/orderbook | Order book depth data |
| GET /api/v1/trades | Recent trades |
| GET /api/v1/klines | Candlestick/OHLC data |
| GET /api/v1/funding | Funding rate information |
| GET /api/v1/index | Index price information |

## Markets

Returns information about all markets available on SyncDex.

### Request

```
GET /api/v1/markets
```

### Parameters

None

### Response

```json
{
  "success": true,
  "data": [
    {
      "symbol": "BTC-USDT",
      "base": "BTC",
      "quote": "USDT",
      "type": "spot",
      "status": "trading",
      "baseAssetPrecision": 8,
      "quoteAssetPrecision": 2,
      "minOrderSize": "0.0001",
      "maxOrderSize": "100",
      "minPrice": "0.01",
      "maxPrice": "1000000",
      "tickSize": "0.01",
      "stepSize": "0.0001"
    },
    {
      "symbol": "ETH-USDT",
      "base": "ETH",
      "quote": "USDT",
      "type": "spot",
      "status": "trading",
      "baseAssetPrecision": 8,
      "quoteAssetPrecision": 2,
      "minOrderSize": "0.001",
      "maxOrderSize": "1000",
      "minPrice": "0.01",
      "maxPrice": "100000",
      "tickSize": "0.01",
      "stepSize": "0.001"
    }
  ],
  "timestamp": 1625097600000
}
```

## Ticker

Returns 24-hour statistics for a single market or all markets.

### Request

```
GET /api/v1/ticker
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | No | Trading pair symbol. If not specified, returns data for all symbols. |

### Response

```json
{
  "success": true,
  "data": [
    {
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
    }
  ],
  "timestamp": 1625097600000
}
```

## Order Book

Returns the order book for a specific market.

### Request

```
GET /api/v1/orderbook
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair symbol |
| limit | integer | No | Limit the number of bids and asks returned. Default 100, max 5000. |

### Response

```json
{
  "success": true,
  "data": {
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
    "timestamp": 1625097600000
  },
  "timestamp": 1625097600000
}
```

## Recent Trades

Returns the recent trades for a specific market.

### Request

```
GET /api/v1/trades
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair symbol |
| limit | integer | No | Limit the number of trades returned. Default 500, max 1000. |

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 105432,
      "price": "28160.50",
      "qty": "0.02",
      "time": 1625097600000,
      "isBuyerMaker": false
    },
    {
      "id": 105431,
      "price": "28155.20",
      "qty": "0.05",
      "time": 1625097540000,
      "isBuyerMaker": true
    }
  ],
  "timestamp": 1625097600000
}
```

## Candlestick Data

Returns candlestick/OHLC data for a specific market.

### Request

```
GET /api/v1/klines
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair symbol |
| interval | string | Yes | Candlestick interval. Valid values: 1m, 5m, 15m, 30m, 1h, 4h, 6h, 12h, 1d, 1w, 1M |
| startTime | long | No | Start time in milliseconds |
| endTime | long | No | End time in milliseconds |
| limit | integer | No | Limit the number of candles returned. Default 500, max 1000. |

### Response

```json
{
  "success": true,
  "data": [
    {
      "openTime": 1625097000000,
      "open": "28140.10",
      "high": "28165.40",
      "low": "28135.20",
      "close": "28160.50",
      "volume": "15.23",
      "closeTime": 1625097599999,
      "quoteVolume": "428386.42",
      "trades": 532,
      "buyVolume": "8.12",
      "buyQuoteVolume": "228402.56"
    }
  ],
  "timestamp": 1625097600000
}
```

## Funding Rate

Returns funding rate information for perpetual contract markets.

### Request

```
GET /api/v1/funding
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | No | Trading pair symbol. If not specified, returns data for all perpetual symbols. |
| limit | integer | No | Limit the number of funding rates returned. Default 100, max 1000. |
| startTime | long | No | Start time in milliseconds |
| endTime | long | No | End time in milliseconds |

### Response

```json
{
  "success": true,
  "data": [
    {
      "symbol": "BTC-USDT-PERP",
      "fundingRate": "0.0001",
      "fundingTime": 1625097600000,
      "nextFundingTime": 1625126400000
    },
    {
      "symbol": "ETH-USDT-PERP",
      "fundingRate": "0.0002",
      "fundingTime": 1625097600000,
      "nextFundingTime": 1625126400000
    }
  ],
  "timestamp": 1625097600000
}
```

## Index Price

Returns index price information for markets.

### Request

```
GET /api/v1/index
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | No | Trading pair symbol. If not specified, returns data for all symbols with index prices. |

### Response

```json
{
  "success": true,
  "data": [
    {
      "symbol": "BTC-USDT",
      "indexPrice": "28153.25",
      "markPrice": "28160.50",
      "lastFundingRate": "0.0001",
      "nextFundingTime": 1625126400000,
      "oraclePrice": "28155.75"
    }
  ],
  "timestamp": 1625097600000
}
```

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 2001 | INVALID_SYMBOL | The requested symbol does not exist |
| 2002 | INVALID_INTERVAL | The requested interval is not valid |
| 2003 | INVALID_LIMIT | The requested limit is out of range |
| 2004 | MARKET_CLOSED | The market is currently closed |
