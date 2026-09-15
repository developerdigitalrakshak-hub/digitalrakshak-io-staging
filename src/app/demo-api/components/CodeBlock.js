'use client';

import { useState } from 'react';
import styles from '../styles/demoApi.module.scss';

export default function CodeBlock({ title = 'Request Sample', code = '', language = 'curl' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic syntax highlighter helper for code presentation
  const renderHighlightedCode = (text) => {
    if (!text) return null;
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      // Highlight curl commands, headers, JSON keys, string values
      let formattedLine = line;

      // Colorize cURL keywords
      if (line.includes('curl') || line.includes('--request') || line.includes('--url') || line.includes('--header') || line.includes('--data')) {
        return (
          <div key={lineIdx} className={styles.codeLine}>
            <span className={styles.cmdKeyword}>{line.slice(0, line.indexOf(' ') > 0 ? line.indexOf(' ') : line.length)}</span>
            <span className={styles.cmdArgs}>{line.slice(line.indexOf(' ') > 0 ? line.indexOf(' ') : 0)}</span>
          </div>
        );
      }

      // JSON string highlighting (e.g., "task": "geoFencing")
      return (
        <div key={lineIdx} className={styles.codeLine}>
          <span dangerouslySetInnerHTML={{
            __html: line
              .replace(/("[\w_]+":)/g, '<span class="json-key" style="color: #e2e8f0; font-weight: 500;">$1</span>')
              .replace(/(:\s*"[^"]*")/g, ': <span class="json-string" style="color: #f43f5e;">$1</span>'.replace(': :', ':'))
              .replace(/(:\s*true|:\s*false)/g, ': <span class="json-bool" style="color: #38bdf8;">$1</span>'.replace(': :', ':'))
              .replace(/(:\s*\d+\.?\d*)/g, ': <span class="json-num" style="color: #a855f7;">$1</span>'.replace(': :', ':'))
          }} />
        </div>
      );
    });
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
          <code>{renderHighlightedCode(code)}</code>
        </pre>
      </div>
    </div>
  );
}
