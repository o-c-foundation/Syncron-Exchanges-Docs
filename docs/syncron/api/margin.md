---
sidebar_position: 5
title: Margin Trading API
---

# Margin Trading API

<!-- ![Margin Trading API](/img/syncron-margin-trading.svg) -->

The Margin Trading API allows you to manage margin accounts, place and manage margin orders, adjust leverage, and access information about your margin positions, funding rates, and liquidation data.

## Base URL

All margin trading API endpoints use the base URL:

```
https://v3.syncron.network/api
```

## Margin Account Endpoints

### Get Margin Account Information

```
GET /api/v3/margin/account
```

Retrieves the user's margin account information including assets, borrowed amounts, interest rates, and account health.

**Weight:** 10

**Parameters:**

None

**Response:**

```json
{
  "borrowEnabled": true,
  "marginLevel": "3.88657039",
  "totalAssetOfBtc": "0.00000000",
  "totalLiabilityOfBtc": "0.00000000",
  "totalNetAssetOfBtc": "0.00000000",
  "tradeEnabled": true,
  "transferEnabled": true,
  "userAssets": [
    {
      "asset": "BTC",
      "borrowed": "0.00000000",
      "free": "0.00000000",
      "interest": "0.00000000",
      "locked": "0.00000000",
      "netAsset": "0.00000000"
    },
    {
      "asset": "ETH",
      "borrowed": "0.00000000",
      "free": "0.00000000",
      "interest": "0.00000000",
      "locked": "0.00000000",
      "netAsset": "0.00000000"
    }
  ]
}
```

### Get Margin Account Balance

```
GET /api/v3/margin/balance
```

Retrieves the balance details for a specific asset in the user's margin account.

**Weight:** 5

**Parameters:**

| Parameter | Type   | Required | Description                       |
|-----------|--------|----------|-----------------------------------|
| asset     | STRING | YES      | The asset to get balance info for |

**Response:**

```json
{
  "asset": "BTC",
  "borrowed": "0.00000000",
  "free": "0.00000000",
  "interest": "0.00000000",
  "locked": "0.00000000",
  "netAsset": "0.00000000"
}
```

### Transfer Between Margin Account and Spot Account

```
POST /api/v3/margin/transfer
```

Transfers funds between your margin account and spot account.

**Weight:** 1

**Parameters:**

| Parameter | Type   | Required | Description                                                            |
|-----------|--------|----------|------------------------------------------------------------------------|
| asset     | STRING | YES      | Asset being transferred, e.g., BTC                                     |
| amount    | DECIMAL| YES      | Amount to be transferred                                               |
| type      | INT    | YES      | 1: Transfer from spot account to margin account<br/>2: Transfer from margin account to spot account |

**Response:**

```json
{
  "tranId": 100000001
}
```

### Get Margin Transfer History

```
GET /api/v3/margin/transfer
```

Retrieves the history of transfers between margin and spot accounts.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | STRING | NO | The asset being transferred, e.g., BTC |
| type | INT | NO | Transfer direction<br/>1: Spot to Margin<br/>2: Margin to Spot |
| startTime | LONG | NO | Start time in milliseconds |
| endTime | LONG | NO | End time in milliseconds |
| current | INT | NO | Current page, default 1 |
| size | INT | NO | Page size, default 10, max 100 |

**Response:**

```json
{
  "rows": [
    {
      "asset": "BTC",
      "amount": "0.00000001",
      "type": 1,
      "status": "CONFIRMED",
      "tranId": 11798835829,
      "timestamp": 1566898617000
    },
    {
      "asset": "ETH",
      "amount": "0.00001",
      "type": 2,
      "status": "CONFIRMED", 
      "tranId": 11798829520,
      "timestamp": 1566888436123
    }
  ],
  "total": 2
}
```

### Get Maximum Borrowable Amount

```
GET /api/v3/margin/maxBorrowable
```

Queries the maximum amount of an asset that can be borrowed.

**Weight:** 5

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | STRING | YES | The asset being borrowed |

**Response:**

```json
{
  "amount": "1.69248805"
}
```

### Get Maximum Transferable Amount

```
GET /api/v3/margin/maxTransferable
```

Queries the maximum amount of an asset that can be transferred from spot account to margin account.

**Weight:** 5

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | STRING | YES | The asset to be transferred |

**Response:**

```json
{
  "amount": "3.59498107"
}
```

## Margin Loan Endpoints

### Create Margin Loan (Borrow)

```
POST /api/v3/margin/loan
```

Apply for a loan in a margin account.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | STRING | YES | The asset being borrowed, e.g., BTC |
| amount | DECIMAL | YES | Amount to be borrowed |

**Response:**

```json
{
  "tranId": 100000001
}
```

### Get Margin Loan Record

```
GET /api/v3/margin/loan
```

Query loan records.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | STRING | NO | The asset being borrowed |
| txId | LONG | NO | The transaction ID |
| startTime | LONG | NO | Start time in milliseconds |
| endTime | LONG | NO | End time in milliseconds |
| current | INT | NO | Current page, default 1 |
| size | INT | NO | Page size, default 10, max 100 |

**Response:**

```json
{
  "rows": [
    {
      "asset": "BTC",
      "principal": "0.00001",
      "timestamp": 1566839893000,
      "status": "CONFIRMED",
      "txId": 5754354324
    }
  ],
  "total": 1
}
```

### Margin Loan Repayment

```
POST /api/v3/margin/repay
```

Repay a loan in a margin account.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | STRING | YES | The asset being repaid, e.g., BTC |
| amount | DECIMAL | YES | Amount to be repaid |

**Response:**

```json
{
  "tranId": 100000001
}
```

### Get Margin Repayment Record

```
GET /api/v3/margin/repay
```

Query repayment records.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | STRING | NO | The asset being repaid |
| txId | LONG | NO | The transaction ID |
| startTime | LONG | NO | Start time in milliseconds |
| endTime | LONG | NO | End time in milliseconds |
| current | INT | NO | Current page, default 1 |
| size | INT | NO | Page size, default 10, max 100 |

**Response:**

```json
{
  "rows": [
    {
      "asset": "BTC",
      "amount": "0.00001",
      "interest": "0.00000005",
      "principal": "0.00000995",
      "timestamp": 1566839893000,
      "status": "CONFIRMED",
      "txId": 5754354324
    }
  ],
  "total": 1
}
```

## Margin Trading Endpoints

### Test New Margin Order

```
POST /api/v3/margin/order/test
```

Test a new margin order creation without actually placing it.

**Weight:** 1

**Parameters:**
Same as for "Create Margin Order"

**Response:**
```json
{}
```

### Create Margin Order

```
POST /api/v3/margin/order
```

Places a new order for margin trading.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | STRING | YES | Trading symbol |
| side | ENUM | YES | BUY or SELL |
| type | ENUM | YES | Order type: LIMIT, MARKET, STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, TAKE_PROFIT_LIMIT, LIMIT_MAKER |
| quantity | DECIMAL | YES | Order quantity |
| price | DECIMAL | NO | Order price |
| stopPrice | DECIMAL | NO | Used with stop orders |
| newClientOrderId | STRING | NO | A unique ID for the order. Automatically generated if not sent |
| icebergQty | DECIMAL | NO | Used to create iceberg orders |
| timeInForce | ENUM | NO | GTC, IOC, FOK |
| sideEffectType | ENUM | NO | NO_SIDE_EFFECT, MARGIN_BUY, AUTO_REPAY |
| recvWindow | LONG | NO | The value cannot be greater than 60000 |
| timestamp | LONG | YES | Current timestamp |

**Response:**

```json
{
  "symbol": "BTCUSDT",
  "orderId": 28,
  "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
  "transactTime": 1507725176595,
  "price": "48000.00000000",
  "origQty": "0.00100000",
  "executedQty": "0.00000000",
  "status": "NEW",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "side": "BUY",
  "marginBuyBorrowAmount": "0.00000000",
  "marginBuyBorrowAsset": "USDT",
  "sideEffectType": "NO_SIDE_EFFECT"
}
```

### Cancel Margin Order

```
DELETE /api/v3/margin/order
```

Cancel an active margin order.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | STRING | YES | Trading symbol |
| orderId | LONG | NO | Order ID |
| origClientOrderId | STRING | NO | Original client order ID |
| newClientOrderId | STRING | NO | Used to uniquely identify this cancel. Automatically generated by default |
| recvWindow | LONG | NO | The value cannot be greater than 60000 |
| timestamp | LONG | YES | Current timestamp |

**Note:** Either `orderId` or `origClientOrderId` must be sent.

**Response:**

```json
{
  "symbol": "BTCUSDT",
  "orderId": 28,
  "origClientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
  "clientOrderId": "APGceJJlT8c170gzwEx3Oq",
  "price": "48000.00000000",
  "origQty": "0.00100000",
  "executedQty": "0.00000000",
  "status": "CANCELED",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "side": "BUY",
  "selfTradePreventionMode": "NONE"
}
```

### Cancel All Open Margin Orders on a Symbol

```
DELETE /api/v3/margin/openOrders
```

Cancels all active orders on a symbol for margin account.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | STRING | YES | Trading symbol |
| recvWindow | LONG | NO | The value cannot be greater than 60000 |
| timestamp | LONG | YES | Current timestamp |

**Response:**

```json
[
  {
    "symbol": "BTCUSDT",
    "orderId": 28,
    "origClientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
    "clientOrderId": "APGceJJlT8c170gzwEx3Oq",
    "price": "48000.00000000",
    "origQty": "0.00100000",
    "executedQty": "0.00000000",
    "status": "CANCELED",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "BUY"
  }
]
```

### Get Margin Order Status

```
GET /api/v3/margin/order
```

Check an order's status in the margin account.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | STRING | YES | Trading symbol |
| orderId | LONG | NO | Order ID |
| origClientOrderId | STRING | NO | Original client order ID |
| recvWindow | LONG | NO | The value cannot be greater than 60000 |
| timestamp | LONG | YES | Current timestamp |

**Note:** Either `orderId` or `origClientOrderId` must be sent.

**Response:**

```json
{
  "symbol": "BTCUSDT",
  "orderId": 28,
  "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
  "price": "48000.00000000",
  "origQty": "0.00100000",
  "executedQty": "0.00050000",
  "cummulativeQuoteQty": "24000.00000000",
  "status": "PARTIALLY_FILLED",
  "timeInForce": "GTC",
  "type": "LIMIT",
  "side": "BUY",
  "stopPrice": "0.00000000",
  "icebergQty": "0.00000000",
  "time": 1499827319559,
  "updateTime": 1499827319559,
  "isWorking": true,
  "marginBuyBorrowAmount": "12000.00000000",
  "marginBuyBorrowAsset": "USDT",
  "selfTradePreventionMode": "NONE"
}
```

### Get Margin Open Orders

```
GET /api/v3/margin/openOrders
```

Get all open margin orders on a symbol.

**Weight:** 
- 1 for a single symbol
- 40 when the symbol parameter is omitted

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | STRING | NO | Trading symbol |
| recvWindow | LONG | NO | The value cannot be greater than 60000 |
| timestamp | LONG | YES | Current timestamp |

**Response:**

```json
[
  {
    "symbol": "BTCUSDT",
    "orderId": 28,
    "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
    "price": "48000.00000000",
    "origQty": "0.00100000",
    "executedQty": "0.00000000",
    "cummulativeQuoteQty": "0.00000000",
    "status": "NEW",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "BUY",
    "stopPrice": "0.00000000",
    "icebergQty": "0.00000000",
    "time": 1499827319559,
    "updateTime": 1499827319559,
    "isWorking": true,
    "marginBuyBorrowAmount": "0.00000000",
    "marginBuyBorrowAsset": "USDT",
    "selfTradePreventionMode": "NONE"
  }
]
```

### Get All Margin Orders

```
GET /api/v3/margin/allOrders
```

Get all margin account orders; active, canceled, or filled.

**Weight:** 5 with symbol

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | STRING | YES | Trading symbol |
| orderId | LONG | NO | Return orders from this ID onward |
| startTime | LONG | NO | Start time in milliseconds |
| endTime | LONG | NO | End time in milliseconds |
| limit | INT | NO | Number of entries to return. Default 500; max 1000 |
| recvWindow | LONG | NO | The value cannot be greater than 60000 |
| timestamp | LONG | YES | Current timestamp |

**Response:**

```json
[
  {
    "symbol": "BTCUSDT",
    "orderId": 28,
    "clientOrderId": "6gCrw2kRUAF9CvJDGP16IP",
    "price": "48000.00000000",
    "origQty": "0.00100000",
    "executedQty": "0.00100000",
    "cummulativeQuoteQty": "48000.00000000",
    "status": "FILLED",
    "timeInForce": "GTC",
    "type": "LIMIT",
    "side": "BUY",
    "stopPrice": "0.00000000",
    "icebergQty": "0.00000000",
    "time": 1499827319559,
    "updateTime": 1499827319559,
    "isWorking": true,
    "marginBuyBorrowAmount": "24000.00000000",
    "marginBuyBorrowAsset": "USDT",
    "selfTradePreventionMode": "NONE"
  }
]
```

### Get Margin Trade List

```
GET /api/v3/margin/myTrades
```

Get trades for a specific margin account and symbol.

**Weight:** 5 with symbol

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | STRING | YES | Trading symbol |
| startTime | LONG | NO | Start time in milliseconds |
| endTime | LONG | NO | End time in milliseconds |
| fromId | LONG | NO | TradeId to fetch from. Default gets most recent trades |
| limit | INT | NO | Number of entries to return. Default 500; max 1000 |
| recvWindow | LONG | NO | The value cannot be greater than 60000 |
| timestamp | LONG | YES | Current timestamp |

**Response:**

```json
[
  {
    "symbol": "BTCUSDT",
    "id": 28,
    "orderId": 100234,
    "price": "48000.00000000",
    "qty": "0.00100000",
    "quoteQty": "48.00000000",
    "commission": "0.00000100",
    "commissionAsset": "BTC",
    "time": 1499865549590,
    "isBuyer": true,
    "isMaker": false,
    "isBestMatch": true,
    "isMarginTrade": true,
    "marginAsset": "USDT"
  }
]
```

## Interest Rate & Liquidation Endpoints

### Get Interest Rate

```
GET /api/v3/margin/interestRate
```

Get the interest rate and quota for the margin assets.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | STRING | NO | The asset to get interest rate for |
| recvWindow | LONG | NO | The value cannot be greater than 60000 |
| timestamp | LONG | YES | Current timestamp |

**Response:**

```json
[
  {
    "asset": "BTC",
    "dailyInterestRate": "0.00025000",
    "yearlyInterestRate": "0.09125000",
    "freeAmount": "0.00000000"
  },
  {
    "asset": "ETH", 
    "dailyInterestRate": "0.00035000",
    "yearlyInterestRate": "0.12775000",
    "freeAmount": "0.00000000"
  }
]
```

### Get Margin Force Liquidation Record

```
GET /api/v3/margin/forceLiquidationRec
```

Get forced liquidation record.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| startTime | LONG | NO | Start time in milliseconds |
| endTime | LONG | NO | End time in milliseconds |
| current | INT | NO | Current page, default 1 |
| size | INT | NO | Page size, default 10, max 100 |
| recvWindow | LONG | NO | The value cannot be greater than 60000 |
| timestamp | LONG | YES | Current timestamp |

**Response:**

```json
{
  "rows": [
    {
      "avgPrice": "0.00000000",
      "executedQty": "0.00000000", 
      "orderId": 63,
      "price": "0.00000000",
      "qty": "0.00000000",
      "side": "SELL",
      "symbol": "BTCUSDT",
      "timeInForce": "GTC",
      "isIsolated": false,
      "updatedTime": 1565590000000
    }
  ],
  "total": 1
}
```

### Get Cross Margin Collateral Ratio

```
GET /api/v3/margin/collateralRatio
```

Get current margin collateral ratio information.

**Weight:** 1

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| recvWindow | LONG | NO | The value cannot be greater than 60000 |
| timestamp | LONG | YES | Current timestamp |

**Response:**

```json
[
  {
    "asset": "BTC",
    "collateralRatio": "0.90"
  },
  {
    "asset": "ETH",
    "collateralRatio": "0.80"
  }
]
```

## Error Codes

In addition to the general error codes, the Margin API has the following specific error codes:

| Error Code | Description |
|------------|-------------|
| -3001 | Margin account not found |
| -3002 | Margin loan amount must be greater than 0 |
| -3003 | Asset not supported for margin trading |
| -3004 | Transfer amount must be greater than 0 |
| -3005 | Margin account risk ratio is too high |
| -3006 | Margin account insufficient balance for transfer |
| -3007 | Margin account maximum loan exceeded |
| -3008 | Margin account margin level is too low |
| -3009 | Margin account not allowed to trade |
| -3010 | Margin account would fall below maintenance margin |
| -3011 | Insufficient cross margin collateral |
| -3012 | Margin account not permitted to withdraw assets |
| -3013 | Margin account in liquidation |
| -3014 | Maximum number of open margin orders reached |
| -3015 | Margin account order amount exceeds available balance |

## Rate Limits

Margin Trading API has the same rate limits as the Spot Trading API but with its own independent counters:

| Limit Type | Interval | Limit |
|------------|----------|-------|
| Request Weight | 1 minute | 1200 |
| Orders | 10 seconds | 50 orders per account |
| Orders | 24 hours | 160,000 orders per account |

Note that some endpoints have higher weights (e.g., getting all open orders). Please check the "Weight" parameter in the endpoint descriptions above.
