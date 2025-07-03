---
title: Frequently Asked Questions
sidebar_position: 7
---

# Frequently Asked Questions

## General Questions

### What is SyncDex?

SyncDex is a decentralized exchange (DEX) platform that offers advanced trading features including spot trading, futures, and cross-chain transactions. Built with security, speed, and reliability in mind, SyncDex provides traders with professional-grade tools typically found on centralized exchanges while maintaining the benefits of decentralization.

### Which blockchains does SyncDex support?

SyncDex currently supports trading on multiple blockchains including:
- Ethereum
- Binance Smart Chain
- Arbitrum
- Optimism
- Polygon
- Avalanche
- Solana

We're continuously adding support for more chains to enhance our cross-chain trading capabilities.

### How do I get started with SyncDex?

Getting started with SyncDex is simple:
1. Connect your wallet (see our [Connect Wallet Guide](./getting-started/connect-wallet))
2. Deposit funds to your SyncDex account
3. Start trading (see our [First Trade Guide](./getting-started/first-trade))

### Is SyncDex custodial or non-custodial?

SyncDex operates on a hybrid model:
- **Non-custodial for deposits/withdrawals**: You always maintain ownership of your funds when depositing or withdrawing.
- **Semi-custodial for trading**: While trading, funds are managed by smart contracts for transaction execution, but you retain control through your connected wallet.

## Account & Security

### How do I secure my SyncDex account?

We recommend the following security practices:
- Enable two-factor authentication (2FA)
- Use a hardware wallet when possible
- Never share your private keys or seed phrases
- Set up IP whitelisting
- Use unique, strong passwords
- Regularly review your API keys and permissions

See our [Security Guide](./account/security) for more details.

### What should I do if I suspect unauthorized access to my account?

If you suspect unauthorized access:
1. Immediately change your password
2. Disable all API keys
3. Enable 2FA if not already active
4. Contact our support team via the help portal
5. Review recent account activity for suspicious transactions

### Are there any account verification requirements?

For basic trading, you can use SyncDex without KYC verification. However, for higher withdrawal limits and certain advanced features, we require standard KYC procedures to comply with regulations. Please see our limits page for more details.

## Trading

### What trading pairs are available on SyncDex?

SyncDex offers a wide range of trading pairs including:
- Major cryptocurrencies (BTC, ETH, etc.) against stablecoins (USDT, USDC, etc.)
- Cross-chain assets
- Perpetual futures with up to 100x leverage
- Spot markets with margin trading options

The full list of available pairs can be found on our trading interface.

### What order types does SyncDex support?

SyncDex supports a comprehensive range of order types:
- Market orders
- Limit orders
- Stop-loss orders
- Take-profit orders
- Stop-limit orders
- Trailing stop orders
- One-cancels-other (OCO) orders
- Time-weighted average price (TWAP) orders

For more details, see our [Order Types Guide](./trading/order-types).

### How does leverage trading work on SyncDex?

SyncDex offers leverage trading up to 100x on select markets. When trading with leverage:
1. You'll need to set up a collateral account
2. Select your desired leverage level
3. Monitor your position's liquidation price
4. Be aware of funding rates for perpetual contracts

For a complete explanation, see our [Leverage Trading Guide](./trading/leverage).

### What are the trading fees?

SyncDex employs a tiered fee structure based on your 30-day trading volume:

| Tier | 30-day Volume (USD) | Maker Fee | Taker Fee |
|------|---------------------|-----------|-----------|
| 1    | < $50,000           | 0.02%     | 0.07%     |
| 2    | $50,000 - $250,000  | 0.015%    | 0.065%    |
| 3    | $250,000 - $1M      | 0.01%     | 0.055%    |
| 4    | $1M - $10M          | 0.008%    | 0.045%    |
| 5    | > $10M              | 0.005%    | 0.030%    |

Holding SyncDex tokens can provide additional fee discounts.

## Deposits & Withdrawals

### How long do deposits take?

Deposit times vary by blockchain:
- Ethereum: 12-30 confirmations (3-8 minutes)
- Binance Smart Chain: 15 confirmations (45 seconds)
- Arbitrum: 15-30 confirmations (< 1 minute)
- Other chains: Varies by network

During times of network congestion, confirmation times may be longer.

### Are there minimum deposit amounts?

Yes, minimum deposit amounts exist to ensure the deposit value exceeds network transaction fees. These minimums vary by asset and network. The current minimums are displayed on the deposit screen for each asset.

### How long do withdrawals take to process?

Withdrawals are processed within these timeframes:
- Regular withdrawals: Processed within 30 minutes
- Large withdrawals: May take up to 24 hours for security verification
- During high-activity periods: May experience delays

All withdrawals are subject to blockchain confirmation times once processed.

### Are there withdrawal limits?

Withdrawal limits depend on your account verification level:

| Level | Daily Withdrawal Limit |
|-------|------------------------|
| Unverified | $10,000 equivalent |
| Basic KYC | $100,000 equivalent |
| Advanced KYC | $1,000,000 equivalent |
| Institutional | Custom limits |

## Cross-Chain Trading

### How does cross-chain trading work on SyncDex?

SyncDex's cross-chain trading system allows you to trade assets across different blockchains in one seamless transaction. The process works through:
1. Smart contract bridges that lock assets on the source chain
2. Minting of wrapped or synthetic assets on the destination chain
3. Executing the trade on the destination chain
4. Settling the transaction back to your desired chain

See our detailed [Cross-Chain Trading Guide](./trading/cross-chain) for more information.

### What are the fees for cross-chain transactions?

Cross-chain transactions involve:
- SyncDex service fee: 0.1-0.3% (depending on the chains involved)
- Network gas fees (for both chains)
- Bridge fees (where applicable)

The total cost is calculated and displayed before you confirm the transaction.

### How long do cross-chain transactions take?

Cross-chain transaction times vary based on the networks involved:
- Fast bridges (Optimism, Arbitrum to Ethereum): 10-30 minutes
- Standard bridges (between major chains): 15-45 minutes
- Complex routes (involving multiple hops): Up to 60 minutes

Status updates are provided throughout the process.

## Technical Support

### How can I contact SyncDex support?

You can reach our support team through:
- Live chat support on our website (24/7)
- Email support at support@syncdex.io
- Discord community (for community-based assistance)
- Telegram community channel

For urgent issues, please use live chat for the fastest response.

### What should I do if a transaction is stuck or failed?

If you encounter a stuck or failed transaction:
1. Check the transaction status on the relevant blockchain explorer
2. Wait for at least 30 minutes as blockchain congestion can delay transactions
3. For deposits: If confirmed on the blockchain but not credited, contact support with the transaction ID
4. For withdrawals: If stuck in "Processing" for more than 2 hours, contact support

### Does SyncDex have an API?

Yes, SyncDex offers a comprehensive API for programmatic trading. Our API includes:
- REST API for market data and trading
- WebSocket streams for real-time data
- FIX API for institutional clients

See our [API Documentation](./api/overview) for details on integration and usage.
