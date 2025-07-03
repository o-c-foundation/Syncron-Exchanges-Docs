---
title: Authentication
sidebar_position: 4
---

# Authentication API

The Syncron API uses several authentication methods to secure access to private endpoints. This page details how to authenticate with the Syncron API and manage API keys.

<!-- Image placeholder for Authentication API -->

## Authentication Methods

Syncron supports four primary authentication methods:

### 1. API Key Authentication

Most API endpoints require API key authentication. You'll need to create an API key in your Syncron account settings.

#### Creating API Keys

1. Log in to your Syncron account
2. Navigate to **Account** > **API Management**
3. Click **Create API Key**
4. Set permissions and IP restrictions
5. Store your API key and secret securely

#### API Key Permissions

When creating API keys, you can assign specific permissions:

| Permission | Description |
|------------|-------------|
| `READ` | Access account information and market data |
| `TRADE` | Place and manage orders |
| `WITHDRAW` | Enable withdrawals |
| `TRANSFER` | Enable internal transfers |

#### Request Signing

For authenticated endpoints, you must sign your requests using your API secret:

```javascript
const crypto = require('crypto');

function generateSignature(queryString, apiSecret) {
  return crypto
    .createHmac('sha256', apiSecret)
    .update(queryString)
    .digest('hex');
}

// Example request parameters
const params = {
  symbol: 'BTC-USDT',
  side: 'BUY',
  type: 'LIMIT',
  timeInForce: 'GTC',
  quantity: '0.01',
  price: '30000',
  timestamp: Date.now()
};

// Create query string
const queryString = Object.keys(params)
  .map(key => `${key}=${params[key]}`)
  .join('&');

// Generate signature
const signature = generateSignature(queryString, 'YOUR_API_SECRET');

// Append signature to query string
const finalQueryString = `${queryString}&signature=${signature}`;
```

### 2. JWT Token Authentication

For web applications, Syncron offers JWT-based authentication:

#### Obtaining a JWT Token

```
POST /auth/login
```

**Parameters:**
- `email` (required): Your Syncron account email
- `password` (required): Your Syncron account password
- `twoFactorCode` (conditional): Required if 2FA is enabled

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresAt": 1626954321000,
    "refreshToken": "def5020089a345..."
  }
}
```

#### Using JWT Tokens

Include the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Refreshing JWT Tokens

```
POST /auth/refresh
```

**Parameters:**
- `refreshToken` (required): The refresh token received during login

### 3. OAuth 2.0

For third-party applications, Syncron supports OAuth 2.0:

#### OAuth 2.0 Flow

1. **Authorization Request:**
   ```
   GET /oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=read,trade
   ```

2. **Exchange Code for Token:**
   ```
   POST /oauth/token
   ```
   
   **Parameters:**
   - `client_id` (required): Your OAuth client ID
   - `client_secret` (required): Your OAuth client secret
   - `grant_type` (required): "authorization_code"
   - `code` (required): The authorization code received
   - `redirect_uri` (required): Must match the redirect URI used in step 1

### 4. Wallet Signature

For blockchain wallet authentication:

```
POST /auth/wallet/challenge
```

**Parameters:**
- `address` (required): Your wallet address

**Response:**
```json
{
  "success": true,
  "data": {
    "challenge": "Sign this message to authenticate with Syncron: 3f7b8c9d2a1e"
  }
}
```

Then sign the challenge message with your wallet and submit:

```
POST /auth/wallet/verify
```

**Parameters:**
- `address` (required): Your wallet address
- `signature` (required): Signature of the challenge message
- `challenge` (required): The challenge string received

## API Endpoints

### Get API Keys

```
GET /user/api-keys
```

Returns all API keys associated with your account.

**Authentication Required:** JWT or API Key (with READ permission)

**Response Example:**
```json
{
  "success": true,
  "data": [
    {
      "keyId": "5f7b8c9d2a1e",
      "name": "Trading Bot",
      "permissions": ["READ", "TRADE"],
      "ipRestrictions": ["192.168.1.1"],
      "createdAt": 1626954321000,
      "lastUsedAt": 1626954721000
    }
  ]
}
```

### Create API Key

```
POST /user/api-keys
```

Creates a new API key.

**Authentication Required:** JWT with 2FA verification

**Parameters:**
- `name` (required): Name for the API key
- `permissions` (required): Array of permissions
- `ipRestrictions` (optional): Array of allowed IP addresses

**Response Example:**
```json
{
  "success": true,
  "data": {
    "keyId": "5f7b8c9d2a1e",
    "secret": "YOUR_API_SECRET", // Only shown once
    "name": "Trading Bot",
    "permissions": ["READ", "TRADE"],
    "ipRestrictions": ["192.168.1.1"],
    "createdAt": 1626954321000
  }
}
```

### Delete API Key

```
DELETE /user/api-keys/{keyId}
```

Deletes an API key.

**Authentication Required:** JWT with 2FA verification

**Parameters:**
- `keyId` (required): The API key ID to delete

### Update API Key

```
PUT /user/api-keys/{keyId}
```

Updates an API key's settings.

**Authentication Required:** JWT with 2FA verification

**Parameters:**
- `name` (optional): New name for the API key
- `permissions` (optional): New array of permissions
- `ipRestrictions` (optional): New array of allowed IP addresses

## Two-Factor Authentication

### Enable 2FA

```
POST /user/2fa/enable
```

Enables two-factor authentication.

**Authentication Required:** JWT

**Response Example:**
```json
{
  "success": true,
  "data": {
    "secret": "JBSWY3DPEHPK3PXP",
    "qrCode": "data:image/png;base64,iVBORw0KGgo..."
  }
}
```

### Verify 2FA

```
POST /user/2fa/verify
```

Verifies and activates 2FA with a code.

**Authentication Required:** JWT

**Parameters:**
- `code` (required): The 2FA code from authenticator app
- `secret` (required): The 2FA secret received from enable endpoint

### Disable 2FA

```
POST /user/2fa/disable
```

Disables two-factor authentication.

**Authentication Required:** JWT with 2FA verification

**Parameters:**
- `code` (required): The 2FA code from authenticator app

## Security Best Practices

1. **Store API secrets securely** - Never expose API secrets in client-side code or public repositories
2. **Set IP restrictions** - Limit API access to specific IP addresses
3. **Use minimum permissions** - Grant only the permissions needed for your application
4. **Rotate API keys regularly** - Create new keys and delete old ones periodically
5. **Enable 2FA** - Always use two-factor authentication for account security
6. **Monitor API usage** - Check API usage logs regularly for suspicious activity
7. **Use HTTPS** - Always use secure connections for API requests
8. **Validate responses** - Check response data integrity before processing

## Common Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 401  | Unauthorized | Invalid or expired credentials |
| 403  | Forbidden | Insufficient permissions |
| 429  | Too Many Requests | Rate limit exceeded |
| 10001 | Invalid signature | Request signature doesn't match |
| 10002 | API key expired | The API key has expired |
| 10003 | IP restricted | Request IP not in allowed list |
| 10004 | Permission denied | API key lacks required permission |

## Sample Authentication Code

### JavaScript Example

```javascript
const crypto = require('crypto');
const axios = require('axios');

async function makeAuthenticatedRequest() {
  const apiKey = 'YOUR_API_KEY';
  const apiSecret = 'YOUR_API_SECRET';
  const baseUrl = 'https://api.syncron.finance';
  
  // Request parameters
  const params = {
    symbol: 'BTC-USDT',
    timestamp: Date.now()
  };
  
  // Create query string
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');
  
  // Generate signature
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(queryString)
    .digest('hex');
  
  // Append signature to query string
  const finalQueryString = `${queryString}&signature=${signature}`;
  
  try {
    const response = await axios.get(`${baseUrl}/trading/openOrders?${finalQueryString}`, {
      headers: {
        'X-API-KEY': apiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}
```

### Python Example

```python
import time
import hmac
import hashlib
import requests

def make_authenticated_request():
    api_key = 'YOUR_API_KEY'
    api_secret = 'YOUR_API_SECRET'
    base_url = 'https://api.syncron.finance'
    
    # Request parameters
    params = {
        'symbol': 'BTC-USDT',
        'timestamp': int(time.time() * 1000)
    }
    
    # Create query string
    query_string = '&'.join([f"{k}={v}" for k, v in params.items()])
    
    # Generate signature
    signature = hmac.new(
        api_secret.encode('utf-8'),
        query_string.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    # Append signature to query string
    final_query_string = f"{query_string}&signature={signature}"
    
    try:
        response = requests.get(
            f"{base_url}/trading/openOrders?{final_query_string}",
            headers={'X-API-KEY': api_key}
        )
        return response.json()
    except Exception as e:
        print(f"API request failed: {e}")
        raise
```

For more information on specific API endpoints that require authentication, refer to the corresponding API documentation sections.
