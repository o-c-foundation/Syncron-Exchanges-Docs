#!/bin/bash

# Create directory for Syncron images
mkdir -p static/img

# List of required image names with friendly titles
declare -A IMAGES=(
  ["syncron-trading-interface"]="Syncron Trading Interface"
  ["syncron-account-dashboard"]="Syncron Account Dashboard"
  ["syncron-login"]="Syncron Login Screen"
  ["syncron-register"]="Syncron Registration"
  ["syncron-kyc-verification"]="Syncron KYC Verification"
  ["syncron-wallet-management"]="Syncron Wallet Management"
  ["syncron-deposit"]="Syncron Deposit Interface"
  ["syncron-withdrawal"]="Syncron Withdrawal Interface"
  ["syncron-2fa-setup"]="Syncron 2FA Setup"
  ["syncron-api-keys"]="Syncron API Key Management"
  ["syncron-advanced-trading"]="Syncron Advanced Trading Tools"
  ["syncron-binary-options"]="Syncron Binary Options"
  ["syncron-order-types"]="Syncron Order Types"
  ["syncron-portfolio"]="Syncron Portfolio Analysis"
  ["syncron-api-endpoints"]="Syncron API Endpoints"
  ["syncron-futures-trading"]="Syncron Futures Trading"
  ["syncron-mobile-app"]="Syncron Mobile Application"
  ["syncron-security"]="Syncron Security Features"
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
      <stop offset="0%" stop-color="#7928CA" />
      <stop offset="100%" stop-color="#FF0080" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-opacity="0.3" />
    </filter>
  </defs>
  <!-- Background Rectangle -->
  <rect width="800" height="450" fill="url(#gradient)" />
  
  <!-- Grid Pattern -->
  <path d="M0 45 H800 M0 90 H800 M0 135 H800 M0 180 H800 M0 225 H800 M0 270 H800 M0 315 H800 M0 360 H800 M0 405 H800" stroke="white" stroke-width="0.5" stroke-opacity="0.2" />
  <path d="M80 0 V450 M160 0 V450 M240 0 V450 M320 0 V450 M400 0 V450 M480 0 V450 M560 0 V450 M640 0 V450 M720 0 V450" stroke="white" stroke-width="0.5" stroke-opacity="0.2" />
  
  <!-- Syncron Logo -->
  <g transform="translate(50, 60)" filter="url(#shadow)">
    <circle cx="35" cy="35" r="35" fill="white" />
    <path d="M20 35 Q35 10, 50 35 Q35 60, 20 35 Z" fill="#FF0080" />
    <circle cx="35" cy="35" r="10" fill="#7928CA" />
    <text x="80" y="40" font-family="Arial" font-weight="bold" font-size="28" fill="white">SYNCRON</text>
    <text x="80" y="60" font-family="Arial" font-size="18" fill="white" fill-opacity="0.8">CENTRALIZED EXCHANGE</text>
  </g>
  
  <!-- Title -->
  <text x="400" y="225" font-family="Arial" font-size="36" font-weight="bold" text-anchor="middle" fill="white" filter="url(#shadow)">${title}</text>
  
  <!-- Placeholder UI Elements -->
  <rect x="150" y="260" width="500" height="120" rx="8" fill="white" fill-opacity="0.15" stroke="white" stroke-width="1" stroke-opacity="0.5" />
  <circle cx="200" cy="290" r="15" fill="white" fill-opacity="0.5" />
  <rect x="230" y="280" width="350" height="20" rx="4" fill="white" fill-opacity="0.5" />
  <rect x="180" y="320" width="100" height="30" rx="4" fill="white" fill-opacity="0.3" />
  <rect x="300" y="320" width="100" height="30" rx="4" fill="white" fill-opacity="0.3" />
  <rect x="420" y="320" width="100" height="30" rx="4" fill="white" fill-opacity="0.3" />
  
  <!-- Copyright -->
  <text x="400" y="430" font-family="Arial" font-size="12" text-anchor="middle" fill="white" fill-opacity="0.7">Syncron Documentation • Image Placeholder</text>
</svg>
EOF
done

echo "Created all Syncron placeholder SVGs successfully!"
chmod +x create-syncron-placeholders.sh
