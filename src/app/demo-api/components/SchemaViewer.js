'use client';

import { useState } from 'react';
import styles from '../styles/demoApi.module.scss';

function TreeRow({ item, level = 0 }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;

  const dots = '. . . .'.slice(0, level * 4 + 4);

  return (
    <div className={styles.treeRowContainer}>
      <div className={styles.treeRow}>
        <span className={styles.dotGuide}>
          {dots}
          {hasChildren ? (
            <button
              className={`${styles.toggleArrow} ${isOpen ? styles.arrowOpen : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle node"
            >
              &gt;
            </button>
          ) : (
            <span className={styles.dotSpacer}></span>
          )}
        </span>

        <span className={styles.paramName}>{item.name}</span>
        <span className={styles.paramType}>{item.type}</span>

        {item.required && <span className={styles.paramRequired}>Required</span>}
      </div>

      {hasChildren && isOpen && (
        <div className={styles.treeChildren}>
          {item.children.map((child, idx) => (
            <TreeRow key={child.name || idx} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SchemaViewer({ data }) {
  return (
    <div className={styles.schemaContainer}>
      {/* Request Section */}
      <section className={styles.docSection}>
        <h2 className={styles.sectionHeading}>Request</h2>

        {/* Header Parameters */}
        {data.headerParameters && data.headerParameters.length > 0 && (
          <div className={styles.subSection}>
            <h3 className={styles.subHeading}>Header Parameters</h3>
            <div className={styles.headerParamsList}>
              {data.headerParameters.map((param) => (
                <div key={param.name} className={styles.headerParamRow}>
                  <span className={styles.paramName}>{param.name}</span>
                  <span className={styles.paramType}>{param.type}</span>
                  {param.required && <span className={styles.paramRequired}>Required</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Body Parameters */}
        {data.requestBody && data.requestBody.length > 0 && (
          <div className={styles.subSection}>
            <h3 className={styles.subHeading}>Body</h3>
            <div className={styles.treeList}>
              {data.requestBody.map((item, idx) => (
                <TreeRow key={item.name || idx} item={item} level={0} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Response Section */}
      <section className={styles.docSection}>
        <h2 className={styles.sectionHeading}>Response</h2>
        {data.responseBody && data.responseBody.length > 0 && (
          <div className={styles.treeList}>
            {data.responseBody.map((item, idx) => (
              <TreeRow key={item.name || idx} item={item} level={0} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
