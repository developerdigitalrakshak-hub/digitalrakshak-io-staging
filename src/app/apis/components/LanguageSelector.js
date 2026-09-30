'use client';

import styles from '../styles/apiDocs.module.scss';

export default function LanguageSelector({ languages, activeLang, onSelectLang }) {
  const getIcon = (id) => {
    switch (id) {
      case 'curl':
        return <span className={styles.curlPrefix}>curl://</span>;
      case 'python':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#3776AB">
            <path d="M11.897 2.002c-4.48 0-4.198 1.942-4.198 1.942l.006 2.012h4.254v.605H6.012S2 6.103 2 10.589c0 4.485 3.504 4.314 3.504 4.314h1.093v-1.547s-.06-1.848 1.818-1.848h3.094s1.758.03 1.758-1.727V6.262s.273-4.26-4.37-4.26zm-1.87 1.34a.798.798 0 1 1 0 1.597.798.798 0 0 1 0-1.597zm2.08 18.656c4.48 0 4.198-1.942 4.198-1.942l-.006-2.012h-4.254v-.605h5.947S22 17.897 22 13.411c0-4.485-3.504-4.314-3.504-4.314h-1.093v1.547s.06 1.848-1.818 1.848h-3.094s-1.758-.03-1.758 1.727v3.526s-.273 4.26 4.37 4.26zm1.87-1.34a.798.798 0 1 1 0-1.597.798.798 0 0 1 0 1.597z"/>
          </svg>
        );
      case 'node':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#68A063">
            <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.3l7.6 4.2L12 12.7 4.4 8.5 12 4.3zM4 10.1l7 3.9v7.7l-7-3.9v-7.7zm16 7.7l-7 3.9v-7.7l7-3.9v7.7z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.languageContainer}>
      <h3 className={styles.languagesHeading}>Languages</h3>
      <div className={styles.languageTabsBar}>
        {languages?.map((lang) => (
          <button
            key={lang.id}
            className={`${styles.langTab} ${activeLang === lang.id ? styles.activeLangTab : ''}`}
            onClick={() => onSelectLang(lang.id)}
          >
            <div className={styles.langIcon}>{getIcon(lang.id)}</div>
            <span className={styles.langLabel}>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
