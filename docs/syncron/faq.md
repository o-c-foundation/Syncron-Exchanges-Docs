---
title: Syncron FAQ
sidebar_position: 6
---

# Frequently Asked Questions - Syncron

## General Questions

### What is Syncron?
Syncron is our advanced centralized cryptocurrency exchange platform featuring institutional-grade trading infrastructure, comprehensive fiat on/off ramps, and a wide range of trading products including spot, margin, futures, and binary options.

### How does Syncron relate to SyncDex?
Syncron (CEX) and SyncDex (DEX) are complementary platforms within the Sync Trading Ecosystem. Syncron provides the convenience, performance, and features of a centralized exchange, while SyncDex offers the security and autonomy of decentralized trading. Users can choose the platform that best suits their specific trading needs.

### What cryptocurrencies does Syncron support?
Syncron supports over 200 cryptocurrencies and 500+ trading pairs. Major assets include BTC, ETH, SOL, BNB, ADA, XRP, DOT, AVAX, MATIC, and many others. We regularly add new tokens after thorough security and compliance evaluations.

### Is Syncron available in my country?
Syncron is available in most countries worldwide, with some exceptions due to regulatory constraints. Currently, we do not serve users from the United States, Iran, North Korea, Syria, Cuba, Crimea region, and certain other restricted jurisdictions. Check our Terms of Service for the complete list of supported and restricted regions.

### How secure is Syncron?
Syncron implements institutional-grade security measures including:
- 95% cold storage of all assets
- Multi-signature withdrawal approval system
- Advanced encryption for all data
- Regular security audits by third-party experts
- Comprehensive DDoS protection
- 24/7 security monitoring
- Robust two-factor authentication

## Account Management

### How do I create a Syncron account?
Visit [syncron.finance](https://syncron.finance), click "Register" in the top-right corner, and follow our [Account Creation Guide](/docs/syncron/getting-started/account-creation) for detailed instructions.

### What verification levels are available?
Syncron offers multiple verification tiers with increasing limits and features:
- Level 1: Basic email/phone verification
- Level 2: ID verification and proof of address
- Level 3: Enhanced verification
- VIP/Institutional: Corporate verification and customized limits

See our [KYC Verification Guide](/docs/syncron/account/kyc-verification) for detailed requirements.

### How long does verification take?
- Level 1: Instant
- Level 2: Typically within 24 hours
- Level 3: 1-3 business days
- VIP/Institutional: 3-10 business days

### Can I have multiple Syncron accounts?
No, Syncron only permits one account per user. Creating multiple accounts violates our Terms of Service and may result in account restrictions or closure. However, institutional clients can create sub-accounts under a single master account.

### What should I do if I forgot my password?
Click "Forgot Password" on the login page and follow the instructions sent to your registered email address. For security reasons, password reset links expire after 30 minutes, and you will need to complete 2FA verification after resetting your password.

## Trading

### What trading pairs are available on Syncron?
Syncron offers 500+ trading pairs across multiple markets:
- USDT markets
- BTC markets
- ETH markets
- Local currency markets (EUR, GBP, AUD, etc.)
- SYNC token markets

### What order types does Syncron support?
Syncron supports a wide range of order types:
- Market orders
- Limit orders
- Stop-limit orders
- OCO (One-Cancels-the-Other)
- Trailing stop orders
- Post-only orders
- Fill-or-kill orders
- Time-weighted average price (TWAP)
- Iceberg orders

See our [Order Types Guide](/docs/syncron/trading/order-types) for detailed explanations.

### What are the trading fees on Syncron?
Syncron uses a maker-taker fee model with discounts based on 30-day trading volume and SYNC token holdings:

| Level | 30-day Volume | SYNC Holdings | Maker Fee | Taker Fee |
|-------|--------------|--------------|-----------|-----------|
| Standard | < $50,000 | 0 | 0.10% | 0.15% |
| Silver | $50,000+ | 1,000+ | 0.08% | 0.12% |
| Gold | $250,000+ | 10,000+ | 0.06% | 0.10% |
| Platinum | $1,000,000+ | 50,000+ | 0.04% | 0.08% |
| Diamond | $5,000,000+ | 100,000+ | 0.02% | 0.05% |

Additional fee discounts available when paying with SYNC tokens.

### How much leverage can I use on Syncron?
Leverage availability varies by product and user verification level:
- Margin trading: Up to 10x leverage
- Futures trading: Up to 125x leverage (asset dependent)
- Binary options: Fixed payout structure

Higher verification levels unlock higher leverage options.

## Deposits & Withdrawals

### How do I deposit cryptocurrency to my Syncron account?
1. Log in to your Syncron account
2. Navigate to "Wallet" > "Deposit"
3. Select the cryptocurrency you wish to deposit
4. Choose the appropriate network (for multi-chain assets)
5. Copy the deposit address or scan the QR code
6. Send funds from your external wallet to this address

See our detailed [Deposit Guide](/docs/syncron/getting-started/deposits) for more information.

### How do I deposit fiat currency to my Syncron account?
Syncron supports multiple fiat deposit methods:
- Bank transfers (SEPA, SWIFT, ACH)
- Credit/debit cards
- Payment processors (PayPal, Skrill)
- Local payment methods (varies by region)

Available methods vary by country and verification level.

### What are the withdrawal limits?
Withdrawal limits depend on your verification level:
- Level 1: Up to 2 BTC equivalent per day
- Level 2: Up to 100 BTC equivalent per day
- Level 3: Up to 500 BTC equivalent per day
- VIP/Institutional: Customized limits

### How long do withdrawals take?
- Cryptocurrency withdrawals: Typically processed within 30 minutes, final delivery depends on network congestion
- Fiat withdrawals: 1-5 business days, depending on payment method and destination country

### Are there fees for deposits and withdrawals?
- Cryptocurrency deposits: Free (blockchain network fees apply)
- Fiat deposits: Varies by method (0-3.5%)
- Cryptocurrency withdrawals: Network-specific fee (dynamic based on congestion)
- Fiat withdrawals: Varies by method and currency (0.1-3%)

## Security

### How do I enable two-factor authentication (2FA)?
1. Log in to your account
2. Go to "Account" > "Security" > "Two-Factor Authentication"
3. Choose between Google Authenticator or SMS verification
4. Follow the on-screen instructions to complete setup
5. Store backup codes securely

We strongly recommend using an authenticator app over SMS for enhanced security.

### What should I do if I lose my 2FA device?
If you've lost access to your 2FA device but have your backup codes:
1. Use a backup code to log in
2. Disable the old 2FA
3. Set up a new 2FA device

If you've lost both your 2FA device and backup codes, contact support with:
- Your registered email
- Photo ID
- Selfie with ID and handwritten note
- Proof of address
- Answers to security questions

### Does Syncron offer insurance for user funds?
Yes, Syncron maintains a Secure Asset Fund for Users (SAFU) that covers potential losses in case of security breaches. Additionally, we carry third-party insurance for digital assets held in cold storage.

## API & Advanced Features

### How do I get started with the Syncron API?
1. Generate API keys in "Account" > "API Management"
2. Set appropriate permissions and IP restrictions
3. Implement authentication as described in our [API Documentation](/docs/syncron/api/authentication)
4. Use our official client libraries or direct REST API endpoints

### Does Syncron offer a mobile app?
Yes, Syncron offers native mobile applications for:
- iOS (iPhone and iPad)
- Android
- Progressive Web App support for other devices

Download links available on [syncron.finance/mobile](https://syncron.finance/mobile).

### How do I report a bug or suggest a feature?
- For bug reports: security@syncron.finance
- For feature suggestions: feedback@syncron.finance
- For general support: support@syncron.finance or use the in-app live chat

### What are SYNC tokens and how do they work?
SYNC tokens are the native utility tokens of the Sync Trading Ecosystem with multiple benefits:
- Trading fee discounts (up to 50%)
- Access to token launchpad
- Governance voting rights
- Staking rewards
- VIP tier qualification
- Ecosystem utility across both Syncron and SyncDex platforms

## Technical Problems

### What should I do if the trading interface is slow or unresponsive?
1. Clear your browser cache and cookies
2. Try using a different browser
3. Check your internet connection stability
4. Disable browser extensions
5. Use the lite version of the interface at [lite.syncron.finance](https://lite.syncron.finance)
6. Try the mobile app as an alternative

### Why is my deposit not showing up?
For cryptocurrency deposits:
- Confirm the transaction has sufficient confirmations on the blockchain
- Verify you sent to the correct address and network
- Check if the asset is currently under maintenance

For fiat deposits:
- Bank transfers may take 1-3 business days to process
- Verify the reference/memo was included correctly
- Ensure the sender name matches your verified account name

### How do I contact Syncron support?
- Live chat: Available 24/7 from the website and app
- Email: support@syncron.finance
- Support tickets: Submit through your account dashboard
- Phone: +1-800-SYNCRON (premium users only)
- Social media: @SyncronExchange on Twitter for public inquiries
