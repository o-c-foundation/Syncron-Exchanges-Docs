---
title: Account API
sidebar_position: 5
---

# Account API

The Account API provides access to account-related information and operations on the SyncDex platform.

## Authentication Required

All endpoints in this section require authentication. Please refer to the [Authentication](./authentication.md) section for details.

## Endpoints Overview

| Endpoint | Description |
|----------|-------------|
| GET /api/v1/account | Get account information |
| GET /api/v1/balance | Get account balance |
| GET /api/v1/transactions | Get account transaction history |
| GET /api/v1/depositAddress | Get deposit address |
| POST /api/v1/withdraw | Submit withdrawal request |
| GET /api/v1/depositHistory | Get deposit history |
| GET /api/v1/withdrawHistory | Get withdrawal history |
| GET /api/v1/tradeFee | Get trading fee rates |
| POST /api/v1/transferSubAccount | Transfer funds between main and sub-accounts |

## Account Information

Get current account information.

### Request

```
GET /api/v1/account
```

### Parameters

None

### Response

```json
{
  "success": true,
  "data": {
    "accountId": "12345",
    "makerCommission": 0.0002,
    "takerCommission": 0.0007,
    "buyerCommission": 0.0007,
    "sellerCommission": 0.0007,
    "canTrade": true,
    "canWithdraw": true,
    "canDeposit": true,
    "updateTime": 1625097600000,
    "accountType": "STANDARD",
    "balances": [
      {
        "asset": "BTC",
        "free": "0.5",
        "locked": "0.1",
        "total": "0.6"
      },
      {
        "asset": "ETH",
        "free": "5.0",
        "locked": "0",
        "total": "5.0"
      },
      {
        "asset": "USDT",
        "free": "10000.0",
        "locked": "5000.0",
        "total": "15000.0"
      }
    ],
    "permissions": ["SPOT", "MARGIN", "FUTURES"]
  },
  "timestamp": 1625097600000
}
```

## Account Balance

Get current account balance for a single asset or all assets.

### Request

```
GET /api/v1/balance
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | string | No | Asset symbol (e.g., BTC, ETH). If not provided, returns all asset balances. |

### Response

```json
{
  "success": true,
  "data": [
    {
      "asset": "BTC",
      "free": "0.5",
      "locked": "0.1",
      "total": "0.6"
    },
    {
      "asset": "ETH",
      "free": "5.0",
      "locked": "0",
      "total": "5.0"
    },
    {
      "asset": "USDT",
      "free": "10000.0",
      "locked": "5000.0",
      "total": "15000.0"
    }
  ],
  "timestamp": 1625097600000
}
```

## Transaction History

Get account transaction history.

### Request

```
GET /api/v1/transactions
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| type | string | No | Transaction type. Options: DEPOSIT, WITHDRAWAL, TRANSFER, TRADE, FEE, FUNDING, DISTRIBUTION. |
| startTime | long | No | Start time in milliseconds |
| endTime | long | No | End time in milliseconds |
| limit | integer | No | Maximum number of records to return. Default 100, max 1000. |
| offset | integer | No | Pagination offset. Default 0. |

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "12345678",
      "type": "TRADE",
      "asset": "BTC",
      "amount": "0.1",
      "fee": "0.00007",
      "feeAsset": "BTC",
      "status": "COMPLETED",
      "txId": null,
      "createTime": 1625097000000,
      "updateTime": 1625097000000,
      "info": "Market buy order"
    },
    {
      "id": "12345677",
      "type": "DEPOSIT",
      "asset": "ETH",
      "amount": "5.0",
      "fee": "0",
      "feeAsset": "ETH",
      "status": "COMPLETED",
      "txId": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "createTime": 1625096000000,
      "updateTime": 1625096300000,
      "info": "Deposit from external wallet"
    }
  ],
  "total": 24,
  "timestamp": 1625097600000
}
```

## Deposit Address

Get deposit address for a specific asset.

### Request

```
GET /api/v1/depositAddress
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | string | Yes | Asset symbol (e.g., BTC, ETH) |
| network | string | No | Blockchain network (e.g., BTC, ETH, BSC, ARBITRUM). If not provided, the default network for the asset is used. |

### Response

```json
{
  "success": true,
  "data": {
    "asset": "BTC",
    "address": "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
    "tag": null,
    "network": "BTC",
    "depositEnabled": true,
    "minConfirmations": 2,
    "minDeposit": "0.0001",
    "depositFee": "0"
  },
  "timestamp": 1625097600000
}
```

## Submit Withdrawal

Submit a withdrawal request.

### Request

```
POST /api/v1/withdraw
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | string | Yes | Asset symbol (e.g., BTC, ETH) |
| address | string | Yes | Destination address |
| amount | string | Yes | Withdrawal amount |
| network | string | No | Blockchain network (e.g., BTC, ETH, BSC, ARBITRUM) |
| addressTag | string | No | Secondary address identifier (e.g., memo, tag) |
| name | string | No | Address label for saved withdrawal addresses |

### Response

```json
{
  "success": true,
  "data": {
    "id": "12345679",
    "asset": "BTC",
    "amount": "0.1",
    "fee": "0.0005",
    "address": "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
    "tag": null,
    "network": "BTC",
    "status": "PROCESSING",
    "txId": null,
    "createTime": 1625097600000
  },
  "timestamp": 1625097600000
}
```

## Deposit History

Get deposit history.

### Request

```
GET /api/v1/depositHistory
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | string | No | Asset symbol (e.g., BTC, ETH) |
| status | string | No | Deposit status. Options: PENDING, COMPLETED, FAILED. |
| startTime | long | No | Start time in milliseconds |
| endTime | long | No | End time in milliseconds |
| limit | integer | No | Maximum number of records to return. Default 100, max 1000. |
| offset | integer | No | Pagination offset. Default 0. |

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "12345677",
      "asset": "ETH",
      "amount": "5.0",
      "network": "ETH",
      "status": "COMPLETED",
      "address": "0xA7EEea7c2bD4435AFEE58E211A61A583C9c40B4A",
      "txId": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      "confirmations": "20",
      "requiredConfirmations": "12",
      "createTime": 1625096000000,
      "updateTime": 1625096300000
    }
  ],
  "total": 12,
  "timestamp": 1625097600000
}
```

## Withdrawal History

Get withdrawal history.

### Request

```
GET /api/v1/withdrawHistory
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | string | No | Asset symbol (e.g., BTC, ETH) |
| status | string | No | Withdrawal status. Options: PENDING, COMPLETED, REJECTED, FAILED, CANCELLED. |
| startTime | long | No | Start time in milliseconds |
| endTime | long | No | End time in milliseconds |
| limit | integer | No | Maximum number of records to return. Default 100, max 1000. |
| offset | integer | No | Pagination offset. Default 0. |

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "12345679",
      "asset": "BTC",
      "amount": "0.1",
      "fee": "0.0005",
      "network": "BTC",
      "status": "COMPLETED",
      "address": "3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy",
      "tag": null,
      "txId": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
      "createTime": 1625097600000,
      "updateTime": 1625097900000
    }
  ],
  "total": 5,
  "timestamp": 1625097950000
}
```

## Trading Fee Rates

Get current trading fee rates.

### Request

```
GET /api/v1/tradeFee
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| symbol | string | No | Trading pair symbol. If not provided, returns fee rates for all symbols. |

### Response

```json
{
  "success": true,
  "data": [
    {
      "symbol": "BTC-USDT",
      "makerCommission": "0.0002",
      "takerCommission": "0.0007"
    },
    {
      "symbol": "ETH-USDT",
      "makerCommission": "0.0002",
      "takerCommission": "0.0007"
    }
  ],
  "timestamp": 1625097600000
}
```

## Transfer to Sub-Account

Transfer funds between main and sub-accounts.

### Request

```
POST /api/v1/transferSubAccount
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| asset | string | Yes | Asset symbol (e.g., BTC, ETH) |
| amount | string | Yes | Transfer amount |
| fromAccountId | string | Yes | Source account ID |
| toAccountId | string | Yes | Destination account ID |

### Response

```json
{
  "success": true,
  "data": {
    "transferId": "12345680",
    "asset": "BTC",
    "amount": "0.1",
    "fromAccountId": "12345",
    "toAccountId": "67890",
    "status": "COMPLETED",
    "createTime": 1625097600000
  },
  "timestamp": 1625097600000
}
```

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 3001 | INSUFFICIENT_BALANCE | Insufficient balance for the requested operation |
| 3002 | WITHDRAWAL_DISABLED | Withdrawals are currently disabled for this asset |
| 3003 | DEPOSIT_DISABLED | Deposits are currently disabled for this asset |
| 3004 | INVALID_ADDRESS | The provided address is invalid |
| 3005 | BELOW_MIN_AMOUNT | Amount is below the minimum required |
| 3006 | ABOVE_MAX_AMOUNT | Amount is above the maximum allowed |
| 3007 | ACCOUNT_NOT_FOUND | The specified account was not found |
