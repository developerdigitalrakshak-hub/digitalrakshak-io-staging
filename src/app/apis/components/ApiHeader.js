'use client';

import { useState } from 'react';
import styles from '../styles/apiDocs.module.scss';

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
          {data?.meta?.breadcrumbs?.map((crumb, idx) => (
            <span key={idx} className={styles.crumbItem}>
              {typeof crumb === 'string' ? crumb.replace(/^\d+[\.\-\s]+/, '') : crumb}
              {idx < data.meta.breadcrumbs.length - 1 && <span className={styles.crumbSep}>/</span>}
            </span>
          ))}
        </div>

        <button className={styles.sandboxButton} onClick={onOpenSandbox}>
          <span className={styles.sandboxDot}></span>
          Test in Sandbox
        </button>
      </div>

      <h1 className={styles.apiTitle}>
        {typeof data?.meta?.title === 'string'
          ? data.meta.title.replace(/^\d+[\.\-\s]+/, '')
          : data?.meta?.title}
      </h1>

      <div
        className={styles.endpointCard}
        onClick={handleCopyUrl}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCopyUrl();
          }
        }}
        title="Click to copy URL"
        aria-label="API endpoint URL, click to copy"
      >
        <span className={`${styles.postBadge} ${styles[data?.endpoint?.method?.toLowerCase()] || styles.post}`}>
          {data?.endpoint?.method || 'POST'}
        </span>
        <span className={styles.endpointUrl}>{data?.endpoint?.url}</span>
        <span className={styles.copyEndpointHint}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          {copiedUrl ? 'Copied!' : 'Copy'}
        </span>
        {copiedUrl && <span className={styles.copiedTooltip}>Copied URL!</span>}
      </div>
    </header>
  );
}
