import React from 'react';
import Layout from '@theme/Layout';
import ApiReference from '@site/src/components/ApiReference';

export default function ApiReferencePage(): JSX.Element {
  return (
    <Layout
      title="API Reference"
      description="Interactive API documentation for SyncDex"
    >
      <ApiReference />
    </Layout>
  );
} 