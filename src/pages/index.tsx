import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <img 
          src="/img/logo-small-dark.png" 
          alt="SyncDex Logo" 
          className={styles.heroLogo} 
        />
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/connect-wallet">
            Getting Started
          </Link>
          <Link
            className="button button--outline button--lg button--primary margin-left--md"
            to="/docs/trading/guide">
            Trading Guide
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const features = [
    {
      title: 'Getting Started',
      description: 'Learn how to connect your wallet and make your first trade on SyncDex.',
      link: '/docs/getting-started/connect-wallet',
      icon: '🚀'
    },
    {
      title: 'Trading Guide',
      description: 'Discover the powerful trading features available on the SyncDex platform.',
      link: '/docs/trading/guide',
      icon: '📊'
    },
    {
      title: 'Account Management',
      description: 'Learn how to manage your account, security, and transaction history.',
      link: '/docs/account/overview',
      icon: '👤'
    },
    {
      title: 'API Documentation',
      description: 'Integrate with SyncDex using our comprehensive API.',
      link: '/docs/api/overview',
      icon: '💻'
    },
    {
      title: 'Leverage Trading',
      description: 'Master the art of leverage trading with up to 100x leverage.',
      link: '/docs/trading/leverage',
      icon: '📈'
    },
    {
      title: 'Cross-Chain Trading',
      description: 'Trade seamlessly across multiple blockchains in a single interface.',
      link: '/docs/trading/cross-chain',
      icon: '⛓️'
    }
  ];
  
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--4 margin-bottom--lg">
              <div className={clsx('card', styles.featureCard)}>
                <div className="card__header">
                  <h3>
                    <span className={styles.featureIcon}>{feature.icon}</span> {feature.title}
                  </h3>
                </div>
                <div className="card__body">
                  <p>{feature.description}</p>
                </div>
                <div className="card__footer">
                  <Link className="button button--primary button--block" to={feature.link}>
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Documentation"
      description="SyncDex - The next-generation decentralized exchange platform with advanced trading features">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
