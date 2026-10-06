'use client';

import { useState } from 'react';
import styles from '../styles/apiDocs.module.scss';

export default function ResponseViewer({ statusCodes = [] }) {
  const [selectedCode, setSelectedCode] = useState(statusCodes[0]?.code || 200);
  const [copied, setCopied] = useState(false);

  const activeCode = statusCodes.some((sc) => Number(sc.code) === Number(selectedCode))
    ? selectedCode
    : (statusCodes[0]?.code || 200);

  const currentStatusObj = statusCodes.find((sc) => Number(sc.code) === Number(activeCode)) || statusCodes[0];
  const responseData = currentStatusObj?.response || {};
  const formattedJson = JSON.stringify(responseData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDotColor = (code) => {
    if (code >= 200 && code < 300) return '#22c55e'; // Green
    if (code >= 400 && code < 500) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const renderJsonLine = (line, idx) => {
    if (!line) return <div key={idx} className={styles.codeLine}>&nbsp;</div>;

    const match = line.match(/^(\s*)("[\w\d_\-\.\s]+"): (.*)$/);
    if (match) {
      const [, indent, key, val] = match;
      let valElement;

      if (val.startsWith('"')) {
        valElement = <span style={{ color: '#e2e8f0' }}>{val}</span>;
      } else if (val.includes('true') || val.includes('false')) {
        valElement = <span style={{ color: '#818cf8' }}>{val}</span>;
      } else if (!isNaN(parseFloat(val))) {
        valElement = <span style={{ color: '#38bdf8' }}>{val}</span>;
      } else {
        valElement = <span style={{ color: '#cbd5e1' }}>{val}</span>;
      }

      return (
        <div key={idx} className={styles.codeLine}>
          <span>
            {indent}
            <span style={{ color: '#f43f5e', fontWeight: 500 }}>{key}</span>: {valElement}
          </span>
        </div>
      );
    }

    return (
      <div key={idx} className={styles.codeLine}>
        <span>{line}</span>
      </div>
    );
  };

  return (
    <div className={styles.responseContainer}>
      {statusCodes && statusCodes.length > 0 && (
        <div className={styles.statusTabsBar}>
          {statusCodes.map((sc) => {
            const isActive = Number(sc.code) === Number(activeCode);
            return (
              <button
                key={sc.code}
                type="button"
                className={`${styles.statusTab} ${isActive ? styles.activeStatusTab : ''}`}
                onClick={() => setSelectedCode(sc.code)}
              >
                <span
                  className={styles.statusDot}
                  style={{
                    backgroundColor: getDotColor(sc.code),
                    boxShadow: isActive ? `0 0 8px ${getDotColor(sc.code)}` : 'none',
                  }}
                />
                <span className={styles.statusCodeText}>{sc.label || sc.code}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className={styles.codeSampleCard}>
        <div className={styles.codeHeader}>
          <span className={styles.codeTitle}>Response Sample</span>
          <button className={styles.copyButton} onClick={handleCopy} title="Copy Response">
            {copied ? (
              <span className={styles.copiedSuccess}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied!
              </span>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </button>
        </div>

        <div className={styles.codeBody}>
          <pre className={styles.preCode}>
            <code>
              {formattedJson.split('\n').map((line, idx) => renderJsonLine(line, idx))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
