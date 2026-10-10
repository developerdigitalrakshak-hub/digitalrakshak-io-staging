'use client';

import { useState } from 'react';
import styles from '../styles/apiDocs.module.scss';

export default function CodeBlock({ title = 'Request Sample', code = '', language = 'curl' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLine = (line, lineIdx) => {
    if (!line) return <div key={lineIdx} className={styles.codeLine}>&nbsp;</div>;

    // Comments
    if (line.trim().startsWith('//') || line.trim().startsWith('#')) {
      return (
        <div key={lineIdx} className={styles.codeLine}>
          <span style={{ color: '#64748b', fontStyle: 'italic' }}>{line}</span>
        </div>
      );
    }

    // cURL command lines
    if (
      line.includes('curl') ||
      line.includes('--request') ||
      line.includes('--url') ||
      line.includes('--header') ||
      line.includes('--data')
    ) {
      const spaceIdx = line.indexOf(' ');
      const keyword = spaceIdx > 0 ? line.slice(0, spaceIdx) : line;
      const rest = spaceIdx > 0 ? line.slice(spaceIdx) : '';
      return (
        <div key={lineIdx} className={styles.codeLine}>
          <span className={styles.cmdKeyword}>{keyword}</span>
          <span className={styles.cmdArgs}>{rest}</span>
        </div>
      );
    }

    // JSON line formatting using regex matching
    const match = line.match(/^(\s*)("[\w\d_\-\.\s]+"): (.*)$/);
    if (match) {
      const [, indent, key, val] = match;
      let valSpan = <span style={{ color: '#f43f5e' }}>{val}</span>;
      if (val.startsWith('"')) {
        valSpan = <span style={{ color: '#f43f5e' }}>{val}</span>;
      } else if (val.includes('true') || val.includes('false')) {
        valSpan = <span style={{ color: '#38bdf8' }}>{val}</span>;
      } else if (!isNaN(parseFloat(val))) {
        valSpan = <span style={{ color: '#a855f7' }}>{val}</span>;
      }

      return (
        <div key={lineIdx} className={styles.codeLine}>
          <span>
            {indent}
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{key}</span>: {valSpan}
          </span>
        </div>
      );
    }

    return (
      <div key={lineIdx} className={styles.codeLine}>
        <span>{line}</span>
      </div>
    );
  };

  return (
    <div className={styles.codeSampleCard}>
      <div className={styles.codeHeader}>
        <span className={styles.codeTitle}>{title}</span>
        <button className={styles.copyButton} onClick={handleCopy} title="Copy Code">
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
          <code>{code.split('\n').map((line, idx) => renderLine(line, idx))}</code>
        </pre>
      </div>
    </div>
  );
}
