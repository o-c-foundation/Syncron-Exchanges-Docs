---
title: Market Data
sidebar_position: 5
---

# Market Data API

The Market Data API provides access to real-time and historical market data for all trading pairs on Syncron. This includes order book data, recent trades, candlestick data, ticker information, and more.

<!-- Image placeholder for Market Data API -->

## Public Endpoints

All market data endpoints are public and do not require authentication. However, rate limits still apply.

## Symbols & Trading Pairs

### Get Exchange Information

```
GET /v1/market/exchangeInfo
```

Returns general exchange information including system status, trading rules, and symbol information.

**Parameters:** None

**Response Example:**
```json
{
  "timezone": "UTC",
  "serverTime": 1626954321000,
  "exchangeFilters": [],
  "symbols": [
    {
      "symbol": "BTC-USDT",
      "status": "TRADING",
      "baseAsset": "BTC",
      "quoteAsset": "USDT",
      "baseAssetPrecision": 8,
      "quotePrecision": 2,
      "orderTypes": ["LIMIT", "MARKET", "STOP_LOSS", "STOP_LOSS_LIMIT"],
      "icebergAllowed": true,
      "filters": [
        {
          "filterType": "PRICE_FILTER",
          "minPrice": "0.01",
          "maxPrice": "1000000.00",
          "tickSize": "0.01"
        },
        {
          "filterType": "LOT_SIZE",
          "minQty": "0.00001",
          "maxQty": "1000.00000",
          "stepSize": "0.00001"
        }
      ]
    }
  ]
}
```

### Get Symbol Information

```
GET /v1/market/symbol
```

Returns detailed information for a specific trading pair.

**Parameters:**
- `symbol` (required): Trading pair symbol (e.g., BTC-USDT)

**Response Example:**
```json
{
  "symbol": "BTC-USDT",
  "status": "TRADING",
  "baseAsset": "BTC",
  "quoteAsset": "USDT",
  "baseAssetPrecision": 8,
  "quotePrecision": 2,
  "orderTypes": ["LIMIT", "MARKET", "STOP_LOSS", "STOP_LOSS_LIMIT"],
  "icebergAllowed": true,
  "filters": [
    {
      "filterType": "PRICE_FILTER",
      "minPrice": "0.01",
      "maxPrice": "1000000.00",
      "tickSize": "0.01"
    },
    {
      "filterType": "LOT_SIZE",
      "minQty": "0.00001",
      "maxQty": "1000.00000",
      "stepSize": "0.00001"
    }
  ]
}
```

## Ticker Data

### Get 24hr Ticker

```
GET /v1/market/ticker/24hr
```

Returns 24-hour price change statistics for all trading pairs or a specific symbol.

**Parameters:**
- `symbol` (optional): Trading pair symbol (e.g., BTC-USDT)

**Response Example (single symbol):**
```json
{
  "symbol": "BTC-USDT",
  "priceChange": "341.50",
  "priceChangePercent": "1.12",
  "weightedAvgPrice": "30241.86",
  "prevClosePrice": "30412.10",
  "lastPrice": "30241.50",
  "lastQty": "0.12340000",
  "bidPrice": "30241.10",
  "askPrice": "30242.90",
  "openPrice": "29900.00",
  "highPrice": "30500.00",
  "lowPrice": "29850.20",
  "volume": "2541.32",
  "quoteVolume": "76542312.45",
  "openTime": 1626825600000,
  "closeTime": 1626912000000,
  "firstId": 123456789,
  "lastId": 123457789,
  "count": 1000
}
```

**Response Example (all symbols):**
```json
[
  {
    "symbol": "BTC-USDT",
    "priceChange": "341.50",
    "priceChangePercent": "1.12",
    // Same fields as above
  },
  {
    "symbol": "ETH-USDT",
    "priceChange": "24.30",
    "priceChangePercent": "1.28",
    // Same fields as above
  }
]
```

### Get Latest Price

```
GET /v1/market/ticker/price
```

Returns latest price for all trading pairs or a specific symbol.

**Parameters:**
- `symbol` (optional): Trading pair symbol (e.g., BTC-USDT)

**Response Example (single symbol):**
```json
{
  "symbol": "BTC-USDT",
  "price": "30241.50"
}
```

**Response Example (all symbols):**
```json
[
  {
    "symbol": "BTC-USDT",
    "price": "30241.50"
  },
  {
    "symbol": "ETH-USDT",
    "price": "1890.75"
  }
]
```

### Get Best Bid/Ask

```
GET /v1/market/ticker/bookTicker
```

Returns best bid/ask price and quantity for all trading pairs or a specific symbol.

**Parameters:**
- `symbol` (optional): Trading pair symbol (e.g., BTC-USDT)

**Response Example (single symbol):**
```json
{
  "symbol": "BTC-USDT",
  "bidPrice": "30241.10",
  "bidQty": "1.52",
  "askPrice": "30242.90",
  "askQty": "0.86"
}
```

## Order Book Data

### Get Order Book

```
GET /v1/market/depth
```

Returns order book for a specific symbol.

**Parameters:**
- `symbol` (required): Trading pair symbol (e.g., BTC-USDT)
- `limit` (optional): Number of price levels to return for bids and asks (default: 100, max: 5000)
  - Valid values: 5, 10, 20, 50, 100, 500, 1000, 5000

**Response Example:**
```json
{
  "lastUpdateId": 1627454312,
  "bids": [
    ["30241.50", "1.25"], // [price, quantity]
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
GET /v1/market/trades
```

Returns recent trades for a specific symbol.

**Parameters:**
- `symbol` (required): Trading pair symbol (e.g., BTC-USDT)
- `limit` (optional): Number of trades to return (default: 500, max: 1000)

**Response Example:**
```json
[
  {
    "id": 28457,
    "price": "30241.50",
    "qty": "0.12340000",
    "time": 1626954321000,
    "isBuyerMaker": false,
    "isBestMatch": true
  },
  {
    "id": 28456,
    "price": "30240.80",
    "qty": "0.05670000",
    "time": 1626954311000,
    "isBuyerMaker": true,
    "isBestMatch": true
  }
]
```

### Get Historical Trades

```
GET /v1/market/historicalTrades
```

Returns historical trades for a specific symbol.

**Parameters:**
- `symbol` (required): Trading pair symbol (e.g., BTC-USDT)
- `limit` (optional): Number of trades to return (default: 500, max: 1000)
- `fromId` (optional): Trade ID to fetch from (inclusive)

**Response Example:**
```json
[
  {
    "id": 28457,
    "price": "30241.50",
    "qty": "0.12340000",
    "time": 1626954321000,
    "isBuyerMaker": false,
    "isBestMatch": true
  }
]
```

## Candlestick Data

### Get Kline/Candlestick Data

```
GET /v1/market/klines
```

Returns candlestick data for a specific symbol.

**Parameters:**
- `symbol` (required): Trading pair symbol (e.g., BTC-USDT)
- `interval` (required): Candlestick interval
  - Valid values: 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
- `startTime` (optional): Start time in milliseconds
- `endTime` (optional): End time in milliseconds
- `limit` (optional): Number of candlesticks to return (default: 500, max: 1000)

**Response Example:**
```json
[
  [
    1626954000000, // Open time
    "30240.50",    // Open price
    "30245.00",    // High price
    "30235.10",    // Low price
    "30241.50",    // Close price
    "12.34",       // Volume
    1626954059999, // Close time
    "372854.12",   // Quote asset volume
    124,           // Number of trades
    "6.17",        // Taker buy base asset volume
    "186427.06",   // Taker buy quote asset volume
    "0"            // Unused field, always 0
  ],
  [
    1626954060000,
    "30241.50",
    "30248.20",
    "30238.80",
    "30245.70",
    "15.62",
    1626954119999,
    "471854.75",
    156,
    "7.81",
    "235927.37",
    "0"
  ]
]
```

## Market Statistics

### Get 24hr Market Summary

```
GET /v1/market/summary/24hr
```

Returns 24-hour market summary for all trading pairs.

**Parameters:**
- `symbol` (optional): Trading pair symbol (e.g., BTC-USDT)

**Response Example:**
```json
[
  {
    "symbol": "BTC-USDT",
    "baseVolume": "2541.32",
    "quoteVolume": "76542312.45",
    "priceChange": "341.50",
    "priceChangePercent": "1.12",
    "highPrice": "30500.00",
    "lowPrice": "29850.20",
    "lastPrice": "30241.50"
  },
  {
    "symbol": "ETH-USDT",
    "baseVolume": "15421.86",
    "quoteVolume": "29147530.25",
    "priceChange": "24.30",
    "priceChangePercent": "1.28",
    "highPrice": "1905.00",
    "lowPrice": "1862.40",
    "lastPrice": "1890.75"
  }
]
```

### Get Average Price

```
GET /v1/market/avgPrice
```

Returns average price for a specific symbol over the last 5 minutes.

**Parameters:**
- `symbol` (required): Trading pair symbol (e.g., BTC-USDT)

**Response Example:**
```json
{
  "mins": 5,
  "price": "30242.65"
}
```

## WebSocket Streams

For real-time market data updates, Syncron provides WebSocket streams. These are more efficient than repeatedly polling the REST API.

### Base WebSocket URL

```
wss://stream.syncron.finance/v1/ws
```

### Subscribing to Streams

To subscribe to a stream, send a JSON message to the WebSocket server:

```json
{
  "method": "SUBSCRIBE",
  "params": [
    "btcusdt@ticker",
    "btcusdt@depth"
  ],
  "id": 1
}
```

To unsubscribe:

```json
{
  "method": "UNSUBSCRIBE",
  "params": [
    "btcusdt@ticker"
  ],
  "id": 2
}
```

### Available Streams

#### Ticker Stream

```
<symbol>@ticker
```

Returns 24-hour statistics for a specific symbol, pushed every second.

**Example message:**
```json
{
  "e": "24hrTicker",  // Event type
  "E": 1626954321000, // Event time
  "s": "BTCUSDT",     // Symbol
  "p": "341.50",      // Price change
  "P": "1.12",        // Price change percent
  "w": "30241.86",    // Weighted average price
  "x": "30412.10",    // Previous day's close price
  "c": "30241.50",    // Last price
  "Q": "0.12340000",  // Last quantity
  "b": "30241.10",    // Best bid price
  "B": "1.52",        // Best bid quantity
  "a": "30242.90",    // Best ask price
  "A": "0.86",        // Best ask quantity
  "o": "29900.00",    // Open price
  "h": "30500.00",    // High price
  "l": "29850.20",    // Low price
  "v": "2541.32",     // Total traded base asset volume
  "q": "76542312.45", // Total traded quote asset volume
  "O": 1626825600000, // Statistics open time
  "C": 1626912000000, // Statistics close time
  "F": 123456789,     // First trade ID
  "L": 123457789,     // Last trade ID
  "n": 1000           // Total number of trades
}
```

#### Trade Stream

```
<symbol>@trade
```

Returns real-time trades as they occur.

**Example message:**
```json
{
  "e": "trade",       // Event type
  "E": 1626954321000, // Event time
  "s": "BTCUSDT",     // Symbol
  "t": 28457,         // Trade ID
  "p": "30241.50",    // Price
  "q": "0.12340000",  // Quantity
  "T": 1626954321000, // Trade time
  "m": false,         // Is the buyer the market maker?
  "M": true           // Ignore
}
```

#### Order Book Stream

```
<symbol>@depth<levels>@<update_speed>
```

- `<levels>`: 5, 10, or 20 (default)
- `<update_speed>`: 100ms, 1000ms (default)

Returns order book updates.

**Example message:**
```json
{
  "e": "depthUpdate",   // Event type
  "E": 1626954321000,   // Event time
  "s": "BTCUSDT",       // Symbol
  "U": 157,             // First update ID in event
  "u": 160,             // Final update ID in event
  "b": [                // Bids to be updated
    ["30241.50", "1.25"],
    ["30240.10", "0.75"]
  ],
  "a": [                // Asks to be updated
    ["30242.10", "0.85"],
    ["30243.20", "1.50"]
  ]
}
```

#### Kline/Candlestick Stream

```
<symbol>@kline_<interval>
```

Returns real-time candlestick updates.

**Example message:**
```json
{
  "e": "kline",         // Event type
  "E": 1626954321000,   // Event time
  "s": "BTCUSDT",       // Symbol
  "k": {
    "t": 1626954060000, // Kline start time
    "T": 1626954119999, // Kline close time
    "s": "BTCUSDT",     // Symbol
    "i": "1m",          // Interval
    "f": 100,           // First trade ID
    "L": 200,           // Last trade ID
    "o": "30241.50",    // Open price
    "c": "30245.70",    // Close price
    "h": "30248.20",    // High price
    "l": "30238.80",    // Low price
    "v": "15.62",       // Base asset volume
    "n": 156,           // Number of trades
    "x": false,         // Is this kline closed?
    "q": "471854.75",   // Quote asset volume
    "V": "7.81",        // Taker buy base asset volume
    "Q": "235927.37",   // Taker buy quote asset volume
    "B": "0"            // Ignore
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 1000 | Invalid symbol |
| 1001 | Invalid interval |
| 1002 | Invalid limit |
| 1003 | Invalid timestamp |
| 1004 | Invalid trade ID |
| 1005 | Rate limit exceeded |
| 1006 | Server error |
| 1007 | Service unavailable |

## Sample Code

### JavaScript Example (REST API)

```javascript
async function getTickerData(symbol) {
  try {
    const response = await fetch(`https://api.syncron.finance/v1/market/ticker/24hr?symbol=${symbol}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching ticker data:', error);
    throw error;
  }
}

// Usage
getTickerData('BTC-USDT');
```

### JavaScript Example (WebSocket)

```javascript
function connectToTickerStream(symbol) {
  const ws = new WebSocket('wss://stream.syncron.finance/v1/ws');
  
  ws.onopen = function() {
    console.log('WebSocket connected');
    
    // Subscribe to ticker stream
    const subscribeMessage = {
      method: 'SUBSCRIBE',
      params: [`${symbol.toLowerCase()}@ticker`],
      id: 1
    };
    
    ws.send(JSON.stringify(subscribeMessage));
  };
  
  ws.onmessage = function(event) {
    const data = JSON.parse(event.data);
    
    // Check if it's a ticker update
    if (data.e === '24hrTicker') {
      console.log('Ticker update:', data);
      // Process ticker data here
    }
  };
  
  ws.onclose = function() {
    console.log('WebSocket disconnected');
  };
  
  ws.onerror = function(error) {
    console.error('WebSocket error:', error);
  };
  
  // Return the WebSocket instance for later use (e.g., to close the connection)
  return ws;
}

// Usage
const tickerStream = connectToTickerStream('BTCUSDT');

// To close the connection later:
// tickerStream.close();
```

### Python Example

```python
import requests
import json
import websocket
from threading import Thread

# REST API example
def get_ticker_data(symbol):
    try:
        response = requests.get(f'https://api.syncron.finance/v1/market/ticker/24hr?symbol={symbol}')
        data = response.json()
        print(data)
        return data
    except Exception as e:
        print(f'Error fetching ticker data: {e}')
        raise

# WebSocket example
def on_message(ws, message):
    data = json.loads(message)
    if 'e' in data and data['e'] == '24hrTicker':
        print(f'Ticker update: {data}')
        # Process ticker data here

def on_error(ws, error):
    print(f'WebSocket error: {error}')

def on_close(ws, close_status_code, close_msg):
    print('WebSocket disconnected')

def on_open(ws):
    print('WebSocket connected')
    
    # Subscribe to ticker stream
    subscribe_message = {
        'method': 'SUBSCRIBE',
        'params': ['btcusdt@ticker'],
        'id': 1
    }
    
    ws.send(json.dumps(subscribe_message))

def connect_to_ticker_stream(symbol):
    websocket_url = 'wss://stream.syncron.finance/v1/ws'
    ws = websocket.WebSocketApp(
        websocket_url,
        on_open=on_open,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close
    )
    
    # Start the WebSocket connection in a separate thread
    wst = Thread(target=ws.run_forever)
    wst.daemon = True
    wst.start()
    
    return ws

# Usage
ticker_data = get_ticker_data('BTC-USDT')
ws = connect_to_ticker_stream('btcusdt')

# To close the connection later:
# ws.close()
```

## Rate Limits

Market data endpoints have specific rate limits to ensure fair usage:

| Endpoint | Weight | Rate Limit |
|----------|--------|------------|
| /v1/market/ticker/24hr | 1 (with symbol) / 40 (without symbol) | 1200 weight per minute |
| /v1/market/ticker/price | 1 (with symbol) / 2 (without symbol) | 1200 weight per minute |
| /v1/market/ticker/bookTicker | 1 (with symbol) / 2 (without symbol) | 1200 weight per minute |
| /v1/market/depth | 1-100 (depending on limit parameter) | 1200 weight per minute |
| /v1/market/trades | 1 | 1200 weight per minute |
| /v1/market/historicalTrades | 5 | 1200 weight per minute |
| /v1/market/klines | 1 | 1200 weight per minute |

For more detailed information about rate limits, see the [API Reference](/docs/syncron/api/reference) section.
