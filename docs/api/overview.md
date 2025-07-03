---
title: API Overview
sidebar_position: 1
---

# SyncDex API Overview

The SyncDex API allows developers to integrate with our platform, access market data, execute trades, and manage accounts programmatically. This documentation provides everything you need to get started with the SyncDex API.

## API Architecture

SyncDex provides two primary API interfaces:

1. **REST API**: For traditional request-response interactions
2. **WebSocket API**: For real-time data streaming and updates

Both APIs use JSON as the data format and implement standard HTTP status codes.

## Base URLs

### REST API

```
https://api.syncdex.finance/v1
```

### WebSocket API

```
wss://ws.syncdex.finance/v1
```

## API Versioning

All API endpoints are versioned to ensure backward compatibility:

- **v1**: Current stable version
- **beta**: Preview of upcoming features (not for production use)

We recommend using the most recent stable version for all integrations.

## API Key Types

SyncDex offers different API key types based on your needs:

### Read-Only Keys
- Access to market data and account information
- No trading privileges
- Lowest security risk

### Trading Keys
- All read-only capabilities
- Ability to place, modify, and cancel orders
- Cannot withdraw funds

### Master Keys
- Full account access
- Trading capabilities
- Withdrawal capabilities (with proper configuration)
- Highest security requirements

## Rate Limits

API access is subject to rate limiting to ensure platform stability:

| API Key Level | REST Rate Limit | WebSocket Connections |
|---------------|-----------------|------------------------|
| Standard      | 60 req/min      | 5 connections          |
| Enhanced      | 300 req/min     | 20 connections         |
| Professional  | 1200 req/min    | 50 connections         |

Rate limits are applied based on:
1. API key (authenticated requests)
2. IP address (unauthenticated requests)

## Request Authentication

### REST API Authentication

All authenticated REST requests must include the following HTTP headers:

```
X-SD-APIKEY: YOUR_API_KEY
X-SD-SIGNATURE: YOUR_SIGNATURE
X-SD-TIMESTAMP: REQUEST_TIMESTAMP
```

### Creating a Signature

1. Create a string by concatenating: timestamp + method + endpoint + (body if POST/PUT)
2. Generate an HMAC-SHA256 signature using your API Secret as the key
3. Convert the signature to hexadecimal format

Example in JavaScript:
```javascript
const crypto = require('crypto');

function generateSignature(apiSecret, timestamp, method, endpoint, body = '') {
  const message = timestamp + method + endpoint + body;
  return crypto
    .createHmac('sha256', apiSecret)
    .update(message)
    .digest('hex');
}
```

### WebSocket Authentication

WebSocket connections are authenticated using a similar approach:

1. Connect to the WebSocket endpoint
2. Send an authentication message within 5 seconds:

```json
{
  "op": "auth",
  "args": [
    "YOUR_API_KEY",
    "REQUEST_TIMESTAMP",
    "SIGNATURE"
  ]
}
```

## Response Format

All API responses follow a consistent structure:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data specific to the endpoint
  },
  "timestamp": 1625097600000
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": 1001,
    "message": "Invalid API key"
  },
  "timestamp": 1625097600000
}
```

## Error Codes

SyncDex uses standardized error codes to help troubleshoot API issues:

| Code Range | Description |
|------------|-------------|
| 1000-1999  | Authentication errors |
| 2000-2999  | Validation errors |
| 3000-3999  | Rate limit errors |
| 4000-4999  | Order errors |
| 5000-5999  | System errors |

See the [Error Codes Reference](./error-codes) for a complete list.

## API Features Overview

### Market Data
- Access real-time market data
- Retrieve historical price information
- View order book depth
- Get funding rates and index prices

### Trading
- Place and manage orders
- Multiple order types support
- Cross-margin and isolated margin trading
- Advanced order parameters

### Account Management
- View balances and positions
- Access transaction history
- Manage account settings
- Sub-account functionality

### WebSocket Streams
- Market data streams
- Order updates
- Position changes
- Account balance updates

## Best Practices

### Security Recommendations

1. **IP Whitelisting**: Restrict API access to specific IP addresses
2. **Minimal Privileges**: Use the least privileged API key type needed
3. **Secure Storage**: Store API secrets securely, never in client-side code
4. **Regular Rotation**: Rotate API keys periodically
5. **Monitoring**: Set up alerts for unusual API activity

### Performance Optimization

1. Use WebSockets for real-time data instead of polling REST endpoints
2. Batch operations when possible
3. Implement exponential backoff for retry logic
4. Cache responses where appropriate
5. Monitor rate limit headers to avoid throttling

## Getting Started

To begin integrating with the SyncDex API:

1. [Create an API Key](./authentication.md#creating-api-keys)
2. Set up authentication using your preferred programming language
3. Explore the API endpoints in this documentation
4. Start with simple read-only operations before implementing trading

## Language-Specific Libraries

SyncDex provides official client libraries for popular programming languages:

- [JavaScript/TypeScript](https://github.com/syncdex/syncdex-js)
- [Python](https://github.com/syncdex/syncdex-python)
- [Go](https://github.com/syncdex/syncdex-go)
- [Java](https://github.com/syncdex/syncdex-java)

Community-maintained libraries are also available for other languages.

## Support and Resources

For API support and additional resources:

- [API Status Page](https://status.syncdex.finance)
- [GitHub Issues](https://github.com/syncdex/api-docs/issues)
- [Developer Community](https://discord.gg/syncdex-dev)
- Email: [api-support@syncdex.finance](mailto:api-support@syncdex.finance)
