'use client';

import { useState } from 'react';
import styles from '../styles/demoApi.module.scss';

export default function ApiHeader({ data, onOpenSandbox }) {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleCopyUrl = () => {
    if (data?.endpoint?.url) {
      navigator.clipboard.writeText(data.endpoint.url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <header className={styles.apiHeader}>
      <div className={styles.topRow}>
        <div className={styles.breadcrumbs}>
          {data.meta.breadcrumbs.map((crumb, idx) => (
            <span key={idx} className={styles.crumbItem}>
              {crumb}
              {idx < data.meta.breadcrumbs.length - 1 && <span className={styles.crumbSep}>/</span>}
            </span>
          ))}
        </div>

        <button className={styles.sandboxButton} onClick={onOpenSandbox}>
          <span className={styles.sandboxDot}></span>
          Test in Sandbox
        </button>
      </div>

      <h1 className={styles.apiTitle}>{data.meta.title}</h1>

      <div className={styles.endpointCard} onClick={handleCopyUrl} title="Click to copy URL">
        <span className={styles.postBadge}>{data.endpoint.method}</span>
        <span className={styles.endpointUrl}>{data.endpoint.url}</span>
        {copiedUrl && <span className={styles.copiedTooltip}>Copied URL!</span>}
      </div>
    </header>
  );
}
