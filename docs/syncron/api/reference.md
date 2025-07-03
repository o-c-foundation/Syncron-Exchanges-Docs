---
title: API Reference
sidebar_position: 3
---

# Syncron API Reference

This comprehensive API reference documents all the endpoints available in the Syncron Exchange API. The API enables programmatic access to trading, account management, market data, and other Syncron features.

<!-- Image placeholder for Syncron API Reference -->

## Base URL

All API requests should be made to the following base URL:

```
https://v3.syncron.network/api
```

## API Sections

The Syncron API is organized into the following major sections:

### Authentication & User Management
- [Authentication](/docs/syncron/api/authentication)
- [User Profile & Management](/docs/syncron/api/user)
- [KYC Verification](/docs/syncron/api/kyc)

### Trading & Market Data
- [Market Data](/docs/syncron/api/market-data) - Tickers, order books, charts
- [Spot Trading](/docs/syncron/api/spot) - Orders, history
- [Futures Trading](/docs/syncron/api/futures) - Orders, positions, funding
- [Binary Options](/docs/syncron/api/binary) - Create and manage binary option trades
- [Watchlists](/docs/syncron/api/watchlist) - Manage favorite markets

### Financial Operations
- [Wallet Management](/docs/syncron/api/wallet) - Access wallet balances and operations
- [Deposits](/docs/syncron/api/deposits) - Crypto and fiat deposit methods
- [Withdrawals](/docs/syncron/api/withdrawals) - Crypto and fiat withdrawal methods
- [Transfers](/docs/syncron/api/transfers) - Internal transfers between wallets

### Investment Products
- [Staking](/docs/syncron/api/staking) - Staking positions and rewards
- [Forex Trading](/docs/syncron/api/forex) - Forex investment plans and accounts
- [ICO Platform](/docs/syncron/api/ico) - Token offering investments

### Other Services
- [Blog & Content](/docs/syncron/api/content) - Access blog posts and other content
- [Support System](/docs/syncron/api/support) - Create and manage support tickets

## Authentication Methods

Syncron supports multiple authentication methods:

1. **API Key Authentication** - For most API endpoints
2. **JWT Token Authentication** - For session-based access
3. **OAuth 2.0** - For third-party applications
4. **Wallet Signature** - For blockchain wallet authentication

See the [Authentication](/docs/syncron/api/authentication) section for detailed information on implementing each method.

## Rate Limits

API access is subject to rate limiting to ensure platform stability:

| Access Level | Requests per Minute | Daily Limit |
|--------------|---------------------|-------------|
| Public       | 60                  | 86,400      |
| User         | 120                 | 172,800     |
| VIP 1        | 300                 | 432,000     |
| VIP 2        | 600                 | 864,000     |
| VIP 3        | 1,200               | 1,728,000   |

Rate limit headers are included in API responses:

```
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 119
X-RateLimit-Reset: 1625097600
```

## Common Response Codes

| Code | Description |
|------|-------------|
| 200  | Success     |
| 400  | Bad Request - Invalid parameters |
| 401  | Unauthorized - Authentication required |
| 403  | Forbidden - Insufficient permissions |
| 404  | Not Found - Resource doesn't exist |
| 429  | Too Many Requests - Rate limit exceeded |
| 500  | Internal Server Error |

## Pagination

Many list endpoints support pagination with the following parameters:

| Parameter | Description | Default |
|-----------|-------------|---------|
| page      | Page number (1-indexed) | 1 |
| limit     | Items per page (max 100) | 20 |

Response format for paginated data:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 542,
    "pages": 28,
    "hasNext": true,
    "hasPrevious": false
  }
}
```

## API Libraries

Official Syncron API libraries are available in multiple languages:

- [JavaScript/TypeScript](https://github.com/syncron/api-js)
- [Python](https://github.com/syncron/api-python)
- [Go](https://github.com/syncron/api-go)
- [Java](https://github.com/syncron/api-java)
- [C#](https://github.com/syncron/api-csharp)

## Support

For API support and questions, please contact:
- Email: api-support@syncron.network
- Developer Discord: [Join](https://discord.gg/syncrondev)
- API Documentation GitHub: [Issues](https://github.com/syncron/api-docs/issues)
