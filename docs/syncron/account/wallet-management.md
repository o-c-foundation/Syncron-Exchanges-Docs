---
title: Wallet Management
sidebar_position: 4
---

# Wallet Management System

Syncron provides a comprehensive wallet management system allowing you to efficiently manage multiple asset types across various wallet categories.

## Wallet Types Overview

![Syncron Wallet Management](/img/syncron-wallet-management.svg)

Syncron's wallet architecture separates assets into distinct wallet types for security and functionality:

### Fiat Wallets

Designated for government-issued currencies like USD, EUR, GBP, etc.:
- Direct bank transfer deposits and withdrawals
- Credit/debit card funding options
- Support for multiple currencies in segregated sub-wallets
- Full transaction history with status tracking
- Payment gateway integration (PayPal, Stripe, etc.)

### Spot Wallets

Standard cryptocurrency wallets for direct ownership of assets:
- Individual wallet for each supported cryptocurrency
- On-chain deposit and withdrawal capabilities
- Instant internal transfers between Syncron users
- Full transaction history with blockchain explorers
- Auto-conversion options for small balances

### Margin Wallets

Dedicated wallets for margin trading operations:
- Cross-margin or isolated margin configurations
- Collateral management for borrowed funds
- Interest accrual tracking
- Liquidation risk indicators
- Margin level monitoring

### Futures Wallets

Specialized wallets for futures contracts trading:
- USDT-margined futures wallet
- Coin-margined futures wallets
- Realized and unrealized PnL tracking
- Automated margin management
- Position risk indicators

### Earning Wallets

Wallets for passive income generation:
- Staking rewards for PoS assets
- Savings products with flexible/fixed terms
- Yield farming allocations
- Interest accrual visualization
- Auto-renewal options

## Wallet Features

### Balance Management

Comprehensive tools to monitor and manage your assets:

- **Real-Time Balances**: Up-to-the-second balance updates
- **Multi-Currency View**: View balances in preferred fiat or crypto denomination
- **Available vs. Locked Funds**: Clear distinction between available and committed assets
- **Balance History**: Interactive charts tracking wallet value over time
- **Estimated Value**: Current market value of all holdings
- **Portfolio Analysis**: Asset distribution visualization and performance metrics

### Transfer System

Efficient movement of funds between wallet types:

1. **Internal Transfers**: Move funds between your own wallets:
   - Spot to Margin: Fund margin trading
   - Spot to Futures: Fund futures trading
   - Margin to Spot: Withdraw trading profits
   - Futures to Spot: Withdraw settlement gains
   - Spot to Earning: Allocate funds to earning products
   - Earning to Spot: Withdraw principal and earned interest

2. **User-to-User Transfers**:
   - Transfer to other Syncron users instantly
   - Fee-free internal transfers
   - Optional memo/reference field
   - Address book for frequent recipients
   - Transfer limits based on verification level

### Deposit Methods

Multiple options for funding your Syncron account:

#### Cryptocurrency Deposits
- On-chain deposits for all supported assets
- Network selection for multi-chain assets
- Dynamic address generation
- QR code support
- Minimum deposit requirements
- Automatic detection with configurable confirmations

#### Fiat Deposits
- Bank wire transfers (SWIFT, SEPA, ACH, etc.)
- Credit/debit card payments
- Payment processor integrations
- Regional payment methods:
  - Europe: SEPA, iDEAL, SOFORT
  - Asia: AliPay, WeChat Pay
  - Americas: ACH, PIX, SPEI
  - Global: PayPal, Skrill

### Withdrawal System

Secure process for withdrawing assets:

#### Cryptocurrency Withdrawals
- Address whitelisting for enhanced security
- Network fee estimator
- Batch withdrawal optimization
- 2FA confirmation requirement
- Time-lock security for new withdrawal addresses
- Withdrawal limits based on verification level
- Anti-phishing withdrawal protection

#### Fiat Withdrawals
- Linked bank account withdrawals
- International wire transfers
- Verification requirements for fiat corridors
- Processing time estimator
- Fee structure display
- Compliance checks automation

## Security Features

Robust security measures protecting your assets:

### Address Management
- **Whitelisting**: Require pre-approval of withdrawal addresses
- **Address Book**: Save and label frequently used addresses
- **Waiting Period**: Optional time delay for new address additions
- **Verification**: Multi-factor authentication for address changes
- **Address Validation**: Format and checksum validation for all chains

### Transaction Security
- **Email Confirmation**: Secondary verification via email link
- **2FA Requirement**: Mandatory 2FA for all withdrawals
- **Anti-Phishing Code**: Custom code displayed in emails
- **Withdrawal PINs**: Separate PIN specifically for withdrawals
- **Session Validation**: Verify device and location
- **Biometric Authentication**: Optional fingerprint/face verification in mobile app

### Risk Management
- **Withdrawal Limits**: Tiered limits based on verification level
- **Abnormal Activity Detection**: AI monitoring of unusual patterns
- **Device Tracking**: Monitor authorized devices
- **Cooling Period**: Enforced delay after security setting changes
- **IP Restrictions**: Optional IP whitelisting
- **Time-Based Locks**: Configurable time-of-day withdrawal restrictions

## Customization Options

Tailor the wallet system to your needs:

### Display Preferences
- **Hidden Small Balances**: Option to hide negligible holdings
- **Default Currency**: Select preferred display currency
- **Asset Sorting**: Organize by balance, name, or performance
- **Widget Configuration**: Customize wallet dashboard layout
- **Notification Settings**: Configure balance and transaction alerts

### Auto-Convert Features
- Convert dust balances to SYNC tokens automatically
- Set threshold for small balance conversion
- Schedule regular conversion of selected assets
- View conversion history and rates

## Asset Management Tools

Advanced features for portfolio optimization:

### Wallet Analytics
- Asset performance tracking
- Historical balance visualization
- Deposit and withdrawal patterns
- Fee expenditure analysis
- Income tracking from staking and earnings

### Tax Reporting
- Transaction export in multiple formats
- Integration with tax software
- Cost basis calculation methods
- Year-end summary reports
- Realized/unrealized gain tracking

### Asset Conversion
- Instant swap between wallet assets
- Market and limit swap orders
- Best price routing across liquidity pools
- Fee comparison between conversion methods
- Conversion history with rate information

## Fiat Wallet Features

Special features for fiat currency management:

### Currency Support
- USD, EUR, GBP, CAD, AUD, JPY, SGD, HKD and more
- Segregated sub-accounts for each currency
- Instant conversion between fiat currencies
- Fiat-to-fiat exchange rates display

### Banking Integration
- Direct bank account linking
- Recurring deposit scheduling
- Standing withdrawal instructions
- Transaction reference generation
- Payment description templates

### Payment Services
- Virtual IBAN allocation
- Local currency accounts
- Corporate payment solutions
- B2B transfer capabilities
- Invoice payment system

## API Access

Programmatic control of wallet functions:

- Query balances across all wallet types
- Generate deposit addresses
- Initiate withdrawals (with proper security)
- Transfer between wallet types
- Fetch transaction history
- Set up webhooks for balance changes

See the [API Documentation](/docs/syncron/api/account#wallets) for implementation details.

## Mobile Wallet Features

Enhanced functionality in the Syncron mobile app:

- Biometric authentication for transactions
- QR code scanning for withdrawals
- Push notifications for wallet activities
- Widget support for quick balance checks
- Offline transaction preparation
- NFC capability for compatible devices

## Institutional Services

Additional features for corporate and institutional accounts:

- Sub-account management
- Role-based access control
- Multi-signature withdrawal approval
- Corporate treasury solutions
- Detailed audit logging
- Fund administrator integration
- Customized reporting

For institutional wallet services, contact enterprise@syncron.finance
