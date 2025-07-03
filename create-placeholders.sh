#!/bin/bash

# List of required image names
IMAGES=(
  "account-dashboard"
  "2fa-setup"
  "transactions-page"
  "transaction-details"
  "transaction-history"
  "api-key-creation"
  "api-key-permissions"
  "anti-phishing"
  "connect-button"
  "wallet-approval"
  "market-selector"
  "trade-confirmation"
  "cross-chain-architecture"
  "cross-chain-interface"
  "trading-interface"
  "leverage-interface"
)

# Create a simple placeholder PNG for each image
for img in "${IMAGES[@]}"; do
  echo "Creating placeholder for $img.png"
  cp static/img/placeholder.svg static/img/$img.png
done

echo "All placeholders created!"
