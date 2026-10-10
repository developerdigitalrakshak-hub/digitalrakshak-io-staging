'use client';

import styles from '../styles/apiDocs.module.scss';

const DEFAULT_LANGUAGES = [
  { id: 'curl', name: 'cURL', icon: 'curl' },
  { id: 'curl-translations', name: 'cURL (with translations)', icon: 'curl-translations' },
  { id: 'python', name: 'Python', icon: 'python' },
  { id: 'javascript', name: 'JavaScript', icon: 'javascript' },
  { id: 'php', name: 'PHP', icon: 'php' },
  { id: 'go', name: 'Go', icon: 'go' },
  { id: 'java', name: 'Java', icon: 'java' },
  { id: 'ruby', name: 'Ruby', icon: 'ruby' }
];

export default function LanguageSelector({ languages, activeLang, onSelectLang }) {
  const displayLanguages = (languages && languages.length > 0) ? languages : DEFAULT_LANGUAGES;

  const getIcon = (id) => {
    switch (id) {
      case 'curl':
      case 'curl-translations':
        return <span className={styles.curlPrefix}>curl</span>;
      case 'python':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M11.897 2.002c-4.48 0-4.198 1.942-4.198 1.942l.006 2.012h4.254v.605H6.012S2 6.103 2 10.589c0 4.485 3.504 4.314 3.504 4.314h1.093v-1.547s-.06-1.848 1.818-1.848h3.094s1.758.03 1.758-1.727V6.262s.273-4.26-4.37-4.26zm-1.87 1.34a.798.798 0 1 1 0 1.597.798.798 0 0 1 0-1.597z" fill="#38bdf8"/>
            <path d="M12.103 21.998c4.48 0 4.198-1.942 4.198-1.942l-.006-2.012H12.04v-.605h5.948S22 17.897 22 13.411c0-4.485-3.504-4.314-3.504-4.314h-1.093v1.547s.06 1.848-1.818 1.848h-3.094s-1.758-.03-1.758 1.727v3.526s-.273 4.26 4.37 4.26zm1.87-1.34a.798.798 0 1 1 0-1.597.798.798 0 0 1 0 1.597z" fill="#facc15"/>
          </svg>
        );
      case 'javascript':
      case 'node':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#f7df1e"/>
            <path d="M6.5 16.5c.5.8 1.3 1.3 2.3 1.3 1.2 0 2-.6 2-2.1v-7.2h-2.1v7.1c0 .6-.3.9-.8.9-.4 0-.7-.2-.9-.6l-.5.6zm7.2-.1c.7 1 1.8 1.6 3.1 1.6 1.8 0 2.9-1 2.9-2.5 0-1.5-.9-2.1-2.4-2.8-.9-.4-1.4-.7-1.4-1.3 0-.5.4-.9 1.1-.9.6 0 1.1.2 1.5.7l.9-.9c-.6-.7-1.4-1-2.4-1-1.6 0-2.6 1-2.6 2.3 0 1.4.9 2 2.2 2.6.9.4 1.6.7 1.6 1.5 0 .6-.5 1-1.3 1-.8 0-1.4-.4-1.9-1.1l-.7.8z" fill="#000"/>
          </svg>
        );
      case 'php':
        return (
          <svg width="16" height="15" viewBox="0 0 24 24" fill="#8892be">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-4.5 13.5H6.2l1.6-7h2.2c1.2 0 2 .7 1.8 1.8-.2 1.3-1.2 2.1-2.3 2.1H8.3l-.8 3.1zm3.6-3.1l.8-3.9h1.3l-.2 1.1c.3-.7 1-1.2 1.8-1.2.9 0 1.4.5 1.2 1.5l-.6 2.5h-1.3l.5-2.3c.1-.4 0-.6-.3-.6-.4 0-.8.3-.9.9l-.5 2h-1.3zm6.6-.8l-.5 2.1h-1.3l1.6-7h2.2c1.2 0 2 .7 1.8 1.8-.2 1.3-1.2 2.1-2.3 2.1h-1.2l-.3 1z"/>
          </svg>
        );
      case 'go':
        return (
          <svg width="18" height="15" viewBox="0 0 24 24" fill="#00ADD8">
            <path d="M1.81 10.97a3.52 3.52 0 0 1 1.76-2.65 4.54 4.54 0 0 1 4.79.24 3.78 3.78 0 0 1 1.53 3.06 4.3 4.3 0 0 1-1.58 3.32 4.67 4.67 0 0 1-5.1-.2 3.49 3.49 0 0 1-1.4-3.77zm11.37-4.14h3.69c.9 2.05 1.8 4.1 2.7 6.16.89-2.06 1.8-4.11 2.7-6.16h3.68v10.37h-3.32v-5.69l-2.07 4.77h-1.99l-2.07-4.77v5.69h-3.32V6.83z"/>
          </svg>
        );
      case 'java':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M8.8 19.3c3.4.2 6.5-.4 9.1-1.7-1.1.8-2.6 1.4-4.3 1.7-1.7.3-3.4.2-4.8 0zm-1.6 1.8c4.2.3 8.3-.3 11.7-1.8-1.5 1-3.6 1.7-5.9 2-2.1.2-4.2.1-5.8-.2zm12.5-7.7c.3.8.4 1.6.2 2.4-.6 1.9-2.6 3.1-4.8 3.1-.3 0-.6 0-.8-.1 1.4-.7 2.4-1.8 2.7-3.1.2-.8.1-1.6-.2-2.3h2.9zM7.2 16.4c3.2.3 6.1-.2 8.7-1.4-1.1.7-2.5 1.2-4.1 1.4-1.6.2-3.2.2-4.6 0z" fill="#f59e0b"/>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1.2 5.1c.3.9-.2 1.8-1.1 2.1-.9.3-1.8-.2-2.1-1.1-.3-.9.2-1.8 1.1-2.1.9-.3 1.8.2 2.1 1.1z" fill="#38bdf8"/>
          </svg>
        );
      case 'ruby':
        return (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#ef4444">
            <path d="M19.7 7.7l-4.1-5.3c-.4-.5-1-.8-1.7-.8H10c-.7 0-1.3.3-1.7.8L4.2 7.7c-.5.6-.5 1.5 0 2.1l7.1 8.8c.4.5 1.1.5 1.5 0l7.1-8.8c.4-.6.4-1.5-.2-2.1zm-8.8 6.7L6.4 8.7l2.8-3.6h4.5l2.8 3.6-4.5 5.7z"/>
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
        {displayLanguages.map((lang) => {
          const isActive = activeLang === lang.id;
          return (
            <button
              key={lang.id}
              className={`${styles.langTab} ${isActive ? styles.activeLangTab : ''}`}
              onClick={() => onSelectLang(lang.id)}
              type="button"
              title={lang.name}
            >
              <span className={styles.langPill}>
                {getIcon(lang.id) && <span className={styles.langIcon}>{getIcon(lang.id)}</span>}
                <span className={styles.langLabel}>{lang.name}</span>
              </span>
              {isActive && <span className={styles.activeUnderline} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
