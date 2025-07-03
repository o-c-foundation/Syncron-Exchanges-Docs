---
title: API Overview
sidebar_position: 1
---

# Syncron API Documentation

The Syncron API provides comprehensive programmatic access to the platform's trading engine, market data, and account management capabilities. This overview outlines the core concepts and architecture.

## API Architecture

Syncron offers a robust, scalable API built on modern REST and WebSocket protocols:

### Core Features

- **High-performance REST API** for trading and account operations
- **Real-time WebSocket streams** for market data and order updates
- **Flexible authentication mechanisms** with API key management
- **Comprehensive endpoints** covering all platform functionality
- **Rate limiting system** with tiered access based on account level
- **Detailed error handling** with standardized response formats

## Base URLs

| Environment | REST API Base URL | WebSocket Base URL |
|-------------|-----------------|-------------------|
| Production | `https://api.syncron.finance` | `wss://stream.syncron.finance` |
| Testnet | `https://testnet-api.syncron.finance` | `wss://testnet-stream.syncron.finance` |

## API Versioning

Our API uses versioning in the URL path to ensure backward compatibility:

```
https://api.syncron.finance/v5/...
```

The current stable version is `v5`. All previous versions are supported but may be deprecated in the future with advance notice.

## Authentication

The Syncron API uses API keys and secrets for authentication. See the [Authentication Documentation](/docs/syncron/api/authentication) for detailed instructions on:

- Creating API keys
- Setting appropriate permissions
- Implementing JWT authentication
- Signature generation for authenticated requests
- Token refreshing mechanism
- Security best practices

## Rate Limits

Rate limits are applied based on:

1. **IP Address**: For unauthenticated requests
2. **API Key**: For authenticated requests based on account tier
3. **Endpoint Type**: Different limits for market data vs. trading operations

Rate limit headers are included in all API responses:

```
X-SYNCRON-RATELIMIT-LIMIT: 1200
X-SYNCRON-RATELIMIT-REMAINING: 1199
X-SYNCRON-RATELIMIT-RESET: 1626688846000
```

Exceeding rate limits results in HTTP 429 responses. Implement exponential backoff for optimal integration.

## Response Formats

All REST API responses use JSON format with standardized structures:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data varies by endpoint
  },
  "timestamp": 1626688846000
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": 40001,
    "message": "Invalid parameter: orderId",
    "details": {
      "parameter": "orderId",
      "reason": "must be a valid UUID"
    }
  },
  "timestamp": 1626688846000
}
```

## API Documentation

Explore specific API functionality in these detailed guides:

- [Authentication](/docs/syncron/api/authentication): Secure your API access
- [Market Data](/docs/syncron/api/market-data): Access ticker, orderbook, and trade data
- [Trading](/docs/syncron/api/trading): Place and manage orders
- [Account](/docs/syncron/api/account): Manage user account and wallet operations
- [WebSockets](/docs/syncron/api/websockets): Real-time data streams and subscription management

## Development Tools

Syncron provides multiple resources to accelerate your API integration:

### Swagger Documentation

Interactive API documentation is available at:
- Production: `https://api.syncron.finance/docs`
- Testnet: `https://testnet-api.syncron.finance/docs`

### Client Libraries

Official client libraries in multiple languages:
- [JavaScript/TypeScript](https://github.com/syncron/syncron-js)
- [Python](https://github.com/syncron/syncron-python)
- [Go](https://github.com/syncron/syncron-go)
- [Java](https://github.com/syncron/syncron-java)

### Testing Environment

The testnet environment provides a sandbox for API testing with simulated trading and virtual balances. Create a testnet account at [testnet.syncron.finance](https://testnet.syncron.finance).

## Best Practices

1. **Webhook Integration**: Register webhooks for important events rather than polling
2. **WebSocket Usage**: Prefer WebSocket connections for real-time data needs
3. **Error Handling**: Implement robust error handling with retry logic
4. **Rate Limit Management**: Monitor rate limit headers and adjust request frequency
5. **Security**: Secure API credentials and implement IP whitelisting
6. **Data Validation**: Always validate response data before processing

## Support and Updates

Stay updated on API changes and announcements:

- [API Changelog](https://developers.syncron.finance/changelog)
- [Developer Blog](https://developers.syncron.finance/blog)
- [GitHub Repository](https://github.com/syncron/syncron-api-docs)
- [Developer Discord](https://discord.gg/syncron-developers)

For technical support with API integration, contact api-support@syncron.finance.
