#!/bin/bash

# List of required image names with friendly titles
declare -A IMAGES=(
  ["account-dashboard"]="Account Dashboard"
  ["2fa-setup"]="2FA Setup"
  ["transactions-page"]="Transactions Page"
  ["transaction-details"]="Transaction Details"
  ["transaction-history"]="Transaction History"
  ["api-key-creation"]="API Key Creation"
  ["api-key-permissions"]="API Key Permissions"
  ["anti-phishing"]="Anti-Phishing Protection"
  ["connect-button"]="Connect Button"
  ["wallet-approval"]="Wallet Approval"
  ["market-selector"]="Market Selector"
  ["trade-confirmation"]="Trade Confirmation"
  ["cross-chain-architecture"]="Cross-Chain Architecture"
  ["cross-chain-interface"]="Cross-Chain Interface"
  ["trading-interface"]="Trading Interface"
  ["leverage-interface"]="Leverage Trading Interface"
)

# Create a unique SVG for each image
for img in "${!IMAGES[@]}"; do
  title="${IMAGES[$img]}"
  echo "Creating placeholder for $img.svg with title: $title"
  
  cat > "static/img/$img.svg" << EOF
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#10B981" />
    </linearGradient>
  </defs>
  <!-- Background Rectangle -->
  <rect width="800" height="450" fill="url(#gradient)" />
  
  <!-- SyncDex Logo Text -->
  <text x="400" y="200" font-family="Arial, sans-serif" font-size="48" text-anchor="middle" fill="white" font-weight="bold">SyncDex</text>
  <text x="400" y="250" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white">$title</text>
</svg>
EOF
done

echo "All SVG placeholders created!"
