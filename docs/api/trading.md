---
title: Trading API
sidebar_position: 4
---

# Trading API

The Trading API enables programmatic trading on the SyncDex platform. This section covers endpoints for creating and managing orders and positions.

## Authentication Required

All endpoints in this section require authentication. Please refer to the [Authentication](./authentication.md) section for details.

## Endpoints Overview

| Endpoint | Description |
|----------|-------------|
| POST /api/v1/order | Place a new order |
| GET /api/v1/order | Query order status |
| DELETE /api/v1/order | Cancel an order |
| GET /api/v1/openOrders | List open orders |
| DELETE /api/v1/openOrders | Cancel all open orders |
| GET /api/v1/allOrders | List all historical orders |
| GET /api/v1/positions | List all open positions |
| POST /api/v1/position/leverage | Set leverage for a position |
| POST /api/v1/position/margin | Add or reduce position margin |

## Place Order

Creates a new order on SyncDex.

### Request

```
POST /api/v1/order
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair symbol |
| side | string | Yes | Order side: BUY or SELL |
| type | string | Yes | Order type: LIMIT, MARKET, STOP, TAKE_PROFIT, STOP_LIMIT, TAKE_PROFIT_LIMIT |
| quantity | string | Yes | Order quantity |
| price | string | Yes for LIMIT orders | Order price |
| timeInForce | string | No | Time in force: GTC (Good Till Cancel), IOC (Immediate or Cancel), FOK (Fill or Kill). Default GTC |
| stopPrice | string | Yes for STOP and TAKE_PROFIT orders | Trigger price for stop orders |
| reduceOnly | boolean | No | If true, the order will only reduce a position, not increase or open new | 
| postOnly | boolean | No | If true, the order will only be executed as a maker order |
| clientOrderId | string | No | Client-generated ID for order tracking |

### Response

```json
{
  "success": true,
  "data": {
    "orderId": "123456789",
    "symbol": "BTC-USDT",
    "side": "BUY",
    "type": "LIMIT",
    "price": "28000.00",
    "origQty": "0.5",
    "executedQty": "0",
    "status": "NEW",
    "timeInForce": "GTC",
    "clientOrderId": "my_order_001",
    "transactTime": 1625097600000,
    "workingType": "CONTRACT_PRICE",
    "reduceOnly": false,
    "postOnly": false
  },
  "timestamp": 1625097600000
}
```

## Query Order

Check the status of an order.

### Request

```
GET /api/v1/order
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair symbol |
| orderId | string | Conditional | SyncDex-generated order ID |
| clientOrderId | string | Conditional | Client-generated order ID |

Either `orderId` or `clientOrderId` must be provided.

### Response

```json
{
  "success": true,
  "data": {
    "orderId": "123456789",
    "symbol": "BTC-USDT",
    "side": "BUY",
    "type": "LIMIT",
    "price": "28000.00",
    "origQty": "0.5",
    "executedQty": "0.2",
    "avgPrice": "28000.00",
    "status": "PARTIALLY_FILLED",
    "timeInForce": "GTC",
    "clientOrderId": "my_order_001",
    "transactTime": 1625097600000,
    "updateTime": 1625097660000,
    "workingType": "CONTRACT_PRICE",
    "reduceOnly": false,
    "postOnly": false,
    "fills": [
      {
        "price": "28000.00",
        "qty": "0.2",
        "commission": "1.12",
        "commissionAsset": "USDT",
        "tradeId": "1234567"
      }
    ]
  },
  "timestamp": 1625097720000
}
```

## Cancel Order

Cancel an existing order.

### Request

```
DELETE /api/v1/order
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair symbol |
| orderId | string | Conditional | SyncDex-generated order ID |
| clientOrderId | string | Conditional | Client-generated order ID |

Either `orderId` or `clientOrderId` must be provided.

### Response

```json
{
  "success": true,
  "data": {
    "orderId": "123456789",
    "symbol": "BTC-USDT",
    "status": "CANCELED",
    "clientOrderId": "my_order_001",
    "origClientOrderId": "my_order_001"
  },
  "timestamp": 1625097780000
}
```

## List Open Orders

Get all open orders for a specific symbol or all symbols.

### Request

```
GET /api/v1/openOrders
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | No | Trading pair symbol. If not provided, returns open orders for all symbols. |
| limit | integer | No | Maximum number of orders to return. Default 100, max 1000. |

### Response

```json
{
  "success": true,
  "data": [
    {
      "orderId": "123456789",
      "symbol": "BTC-USDT",
      "side": "BUY",
      "type": "LIMIT",
      "price": "28000.00",
      "origQty": "0.5",
      "executedQty": "0.2",
      "status": "PARTIALLY_FILLED",
      "timeInForce": "GTC",
      "clientOrderId": "my_order_001",
      "time": 1625097600000,
      "updateTime": 1625097660000,
      "reduceOnly": false,
      "postOnly": false
    },
    {
      "orderId": "123456790",
      "symbol": "ETH-USDT",
      "side": "SELL",
      "type": "LIMIT",
      "price": "1800.00",
      "origQty": "2.0",
      "executedQty": "0",
      "status": "NEW",
      "timeInForce": "GTC",
      "clientOrderId": "my_order_002",
      "time": 1625097720000,
      "updateTime": 1625097720000,
      "reduceOnly": false,
      "postOnly": true
    }
  ],
  "timestamp": 1625097780000
}
```

## Cancel All Open Orders

Cancel all open orders for a specific symbol.

### Request

```
DELETE /api/v1/openOrders
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair symbol |

### Response

```json
{
  "success": true,
  "data": [
    {
      "orderId": "123456789",
      "symbol": "BTC-USDT",
      "status": "CANCELED",
      "clientOrderId": "my_order_001",
      "origClientOrderId": "my_order_001"
    }
  ],
  "timestamp": 1625097840000
}
```

## List All Orders

Get all historical orders for a specific symbol.

### Request

```
GET /api/v1/allOrders
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair symbol |
| startTime | long | No | Start time in milliseconds |
| endTime | long | No | End time in milliseconds |
| limit | integer | No | Maximum number of orders to return. Default 100, max 1000. |

### Response

```json
{
  "success": true,
  "data": [
    {
      "orderId": "123456788",
      "symbol": "BTC-USDT",
      "side": "SELL",
      "type": "MARKET",
      "price": "0.00",
      "origQty": "0.1",
      "executedQty": "0.1",
      "avgPrice": "28100.00",
      "status": "FILLED",
      "timeInForce": "GTC",
      "clientOrderId": "my_market_order",
      "time": 1625097500000,
      "updateTime": 1625097500000,
      "reduceOnly": false
    },
    {
      "orderId": "123456789",
      "symbol": "BTC-USDT",
      "side": "BUY",
      "type": "LIMIT",
      "price": "28000.00",
      "origQty": "0.5",
      "executedQty": "0.2",
      "status": "CANCELED",
      "timeInForce": "GTC",
      "clientOrderId": "my_order_001",
      "time": 1625097600000,
      "updateTime": 1625097840000,
      "reduceOnly": false,
      "postOnly": false
    }
  ],
  "timestamp": 1625097900000
}
```

## List Open Positions

Get all open positions.

### Request

```
GET /api/v1/positions
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | No | Trading pair symbol. If not provided, returns positions for all symbols. |

### Response

```json
{
  "success": true,
  "data": [
    {
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
      "updateTime": 1625097800000
    },
    {
      "symbol": "ETH-USDT",
      "positionSide": "SHORT",
      "entryPrice": "1850.50",
      "markPrice": "1830.25",
      "positionAmt": "1.0",
      "leverage": "5",
      "unrealizedProfit": "20.25",
      "marginType": "CROSS",
      "isolatedMargin": "0",
      "liquidationPrice": "1942.32",
      "updateTime": 1625097900000
    }
  ],
  "timestamp": 1625097950000
}
```

## Set Position Leverage

Change the leverage for a specific symbol.

### Request

```
POST /api/v1/position/leverage
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair symbol |
| leverage | integer | Yes | Target leverage: 1-100 |

### Response

```json
{
  "success": true,
  "data": {
    "symbol": "BTC-USDT",
    "leverage": "20",
    "maxNotionalValue": "1000000"
  },
  "timestamp": 1625098000000
}
```

## Modify Position Margin

Add or reduce margin for a position.

### Request

```
POST /api/v1/position/margin
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | Yes | Trading pair symbol |
| amount | string | Yes | Amount to add or reduce |
| type | integer | Yes | 1: Add margin, 2: Reduce margin |

### Response

```json
{
  "success": true,
  "data": {
    "symbol": "BTC-USDT",
    "amount": "100",
    "type": 1,
    "positionSide": "LONG",
    "marginType": "ISOLATED",
    "isolatedMargin": "660.00",
    "liquidationPrice": "24735.18"
  },
  "timestamp": 1625098060000
}
```

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 4001 | INVALID_ORDER_TYPE | The requested order type is not valid |
| 4002 | INVALID_SIDE | The requested side is not valid |
| 4003 | INVALID_QUANTITY | The requested quantity is invalid |
| 4004 | INVALID_PRICE | The requested price is invalid |
| 4005 | INSUFFICIENT_BALANCE | Insufficient balance to execute order |
| 4006 | ORDER_DOES_NOT_EXIST | The requested order does not exist |
| 4007 | TOO_MANY_OPEN_ORDERS | Maximum number of open orders reached |
| 4008 | PRICE_OUT_OF_RANGE | Order price is outside allowed range |
| 4009 | LEVERAGE_NOT_ALLOWED | Requested leverage is not allowed |
