'use client';

import { useState } from 'react';
import styles from '../styles/demoApi.module.scss';

export default function ResponseViewer({ statusCodes = [] }) {
  const [selectedCode, setSelectedCode] = useState(statusCodes[0]?.code || 200);
  const [copied, setCopied] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentStatusObj = statusCodes.find((sc) => sc.code === Number(selectedCode)) || statusCodes[0];
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

  return (
    <div className={styles.responseContainer}>
      <div className={styles.statusDropdownWrapper}>
        <button
          className={styles.statusSelectButton}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className={styles.statusDot} style={{ backgroundColor: getDotColor(selectedCode) }}></span>
          <span className={styles.statusCodeText}>{selectedCode}</span>
          <span className={styles.dropdownChevron}>▼</span>
        </button>

        {isDropdownOpen && (
          <div className={styles.statusDropdownMenu}>
            {statusCodes.map((sc) => (
              <div
                key={sc.code}
                className={`${styles.statusOption} ${sc.code === selectedCode ? styles.activeStatusOption : ''}`}
                onClick={() => {
                  setSelectedCode(sc.code);
                  setIsDropdownOpen(false);
                }}
              >
                <span className={styles.statusDot} style={{ backgroundColor: getDotColor(sc.code) }}></span>
                <span>{sc.label || sc.code}</span>
              </div>
            ))}
          </div>
        )}
      </div>

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
              {formattedJson.split('\n').map((line, idx) => (
                <div key={idx} className={styles.codeLine}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/"([^"]+)":/g, '<span style="color: #f43f5e; font-weight: 500;">"$1"</span>:')
                        .replace(/:\s*"([^"]*)"/g, ': <span style="color: #e2e8f0;">"$1"</span>')
                        .replace(/:\s*(true|false)/g, ': <span style="color: #818cf8;">$1</span>')
                        .replace(/:\s*(\d+\.?\d*)/g, ': <span style="color: #38bdf8;">$1</span>')
                    }}
                  />
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
