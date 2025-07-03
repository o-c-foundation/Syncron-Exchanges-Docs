---
title: Trading Interface
sidebar_position: 1
---

# Syncron Trading Interface

The Syncron trading interface is an advanced, customizable platform designed for both beginners and professional traders. This guide explores its features and optimal usage.

## Interface Overview

![Syncron Trading Interface](/img/syncron-trading-interface.svg)

The Syncron trading interface is divided into several key components:

1. **Navigation Header**: Platform navigation, account menu, and settings
2. **Market Selector**: Choose trading pairs with advanced filtering options
3. **Advanced Chart**: TradingView-powered chart with multiple timeframes and indicators
4. **Order Book**: Real-time market depth visualization
5. **Trade History**: Recent market trades with timestamp, price, and volume
6. **Order Form**: Create and submit different order types
7. **Open Orders**: View and manage your active orders
8. **Position Information**: Current position details for margin/futures trading
9. **Trade History**: Your personal trading history
10. **Order Status**: Real-time updates on order execution

## Customizable Layout

Syncron's trading interface features a fully adaptive layout that can be customized to your preferences:

### Layout Options

- **Standard**: Default layout with all panels visible
- **Chart Focus**: Enlarged chart with minimized panels
- **Trading Focus**: Emphasis on order book and trading panels
- **Custom**: Create and save your own layout configurations

To modify your layout:
1. Click the layout icon in the top-right corner
2. Drag and resize panels as needed
3. Click "Save Layout" to preserve your configuration
4. Name your custom layout for easy switching

### Dark/Light Mode

Toggle between dark and light themes via the appearance settings in the top navigation bar. The system also supports:
- Auto mode (follows system preferences)
- Scheduled switching (e.g., dark mode at night)
- Custom color schemes for colorblind accessibility

## Advanced Charting

Powered by a custom charting library, Syncron offers professional-grade technical analysis tools:

### Chart Features

- **Multiple Chart Types**: Candlestick, line, bar, Heikin Ashi, and more
- **Timeframes**: From 1-minute to monthly views
- **Drawing Tools**: Over 100 tools including trend lines, Fibonacci retracements, and Gann fans
- **Indicators**: 150+ technical indicators with customizable parameters
- **Multiple Charts**: Open up to 4 charts simultaneously for different pairs or timeframes
- **One-Click Trading**: Execute trades directly from the chart
- **Templates**: Save and load chart configurations

### Chart Customization

Adjust chart appearance via the chart settings menu:
- Candle colors and styles
- Background colors
- Grid visibility
- Price scale position
- Volume display options

## Real-Time Order Book

The order book displays live market depth with the following features:

- Color-coded bid/ask visualization
- Aggregated price levels
- Cumulative volume display
- Price clustering customization
- One-click trading from order book
- Visual trade execution animations

Toggle between standard and depth chart views to visualize market liquidity differently.

## Performance Optimization

Syncron's trading interface is optimized for high performance:

- WebSocket connections for real-time data
- Efficient memory usage even with long trading sessions
- Data throttling options for slower connections
- Hardware acceleration when available
- Progressive loading for faster initial rendering

## Mobile Responsiveness

The trading interface automatically adapts to various screen sizes:

- Desktop: Full-featured experience
- Tablet: Optimized panel layout
- Mobile: Streamlined essential trading functions
- PWA support for app-like experience on mobile devices

## Keyboard Shortcuts

Enhance your trading efficiency with keyboard shortcuts:

| Action | Shortcut |
|--------|----------|
| Submit buy order | <kbd>Alt</kbd> + <kbd>B</kbd> |
| Submit sell order | <kbd>Alt</kbd> + <kbd>S</kbd> |
| Cancel last order | <kbd>Alt</kbd> + <kbd>C</kbd> |
| Cancel all orders | <kbd>Alt</kbd> + <kbd>X</kbd> |
| Toggle order book | <kbd>Alt</kbd> + <kbd>O</kbd> |
| Expand chart | <kbd>Alt</kbd> + <kbd>E</kbd> |

View all available shortcuts by pressing <kbd>Alt</kbd> + <kbd>/</kbd> while on the trading page.

## API Integration

For algorithmic trading, Syncron's interface integrates with our [API services](/docs/syncron/api/overview):

- WebSocket streams for real-time data
- REST API endpoints for trading and account management
- Strategy backtesting tools built into the interface
- Custom API key generation with permission controls

## Troubleshooting

If you encounter issues with the trading interface:

1. **Refresh the page**: Solves most temporary display issues
2. **Check your connection**: Ensure stable internet access
3. **Clear browser cache**: Removes potentially corrupted data
4. **Try incognito mode**: Tests without extensions interference
5. **Contact support**: For persistent issues

For advanced users, the console log (accessible via browser developer tools) provides detailed error information.
