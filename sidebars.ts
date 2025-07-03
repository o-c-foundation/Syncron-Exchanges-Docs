import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Sidebar configuration for SyncDex and Syncron Documentation
 */

const sidebars: SidebarsConfig = {
  // Main documentation sidebar
  docsSidebar: [
    'overview',
    {
      type: 'html',
      value: '<span class="sidebar-heading">SyncDex (DEX)</span>',
      className: 'sidebar-heading-item',
    },
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
        title: 'Getting Started with SyncDex',
        description: 'Learn how to get started with the SyncDex platform',
      },
      items: [
        'getting-started/connect-wallet',
        'getting-started/first-trade',
      ],
    },
    {
      type: 'category',
      label: 'Trading',
      link: {
        type: 'generated-index',
        title: 'Trading on SyncDex',
        description: 'Everything you need to know about trading on SyncDex',
      },
      items: [
        'trading/guide',
        'trading/order-types',
        'trading/leverage',
        'trading/cross-chain',
      ],
    },
    {
      type: 'category',
      label: 'Account',
      link: {
        type: 'generated-index',
        title: 'Account Management',
        description: 'Manage your SyncDex account and settings',
      },
      items: [
        'account/overview',
        'account/security',
        'account/transactions',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      link: {
        type: 'generated-index',
        title: 'API Documentation',
        description: 'Integrate with SyncDex using our API',
      },
      items: [
        'api/overview',
        'api/authentication',
        'api/market-data',
        'api/trading',
        'api/account',
        'api/websockets',
      ],
    },
    'faq',
    {
      type: 'html',
      value: '<span class="sidebar-heading">Syncron (CEX)</span>',
      className: 'sidebar-heading-item',
    },
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
        title: 'Getting Started with Syncron',
        description: 'Learn how to get started with the Syncron platform',
      },
      items: [
        'syncron/getting-started/account-creation',
        'syncron/getting-started/mobile-app',
        'syncron/getting-started/security',
      ],
    },
    {
      type: 'category',
      label: 'Trading',
      link: {
        type: 'generated-index',
        title: 'Trading on Syncron',
        description: 'Everything you need to know about trading on Syncron',
      },
      items: [
        'syncron/trading/interface',
        'syncron/trading/advanced-tools',
        'syncron/trading/futures-trading',
        'syncron/trading/binary-options',
      ],
    },
    {
      type: 'category',
      label: 'Account Management',
      link: {
        type: 'generated-index',
        title: 'Syncron Account Management',
        description: 'Manage your Syncron account and settings',
      },
      items: [
        'syncron/account/dashboard',
        'syncron/account/kyc-verification',
        'syncron/account/wallet-management',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      link: {
        type: 'generated-index',
        title: 'Syncron API Documentation',
        description: 'Integrate with Syncron using our API',
      },
      items: [
        'syncron/api/overview',
        'syncron/api/endpoints',
      ],
    },
    'syncron/faq',
  ],
};

export default sidebars;
