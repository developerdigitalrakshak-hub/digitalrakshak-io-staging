'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/apiDocs.module.scss';

export default function Sidebar({ data, activeEndpoint, onSelectEndpoint, isOpen, onClose }) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState({});

  const endpointsList = data?.endpoints ? Object.values(data.endpoints) : [data];

  // Group endpoints by category
  const categoriesMap = {};
  endpointsList.forEach((ep) => {
    if (!ep) return;
    const catName = ep.meta?.category || 'General';
    if (!categoriesMap[catName]) {
      categoriesMap[catName] = [];
    }
    const rawName = ep.meta?.title || ep.id;
    const cleanName = typeof rawName === 'string' ? rawName.replace(/^\d+[\.\-\s]+/, '') : rawName;
    categoriesMap[catName].push({
      id: ep.id,
      name: cleanName,
      method: ep.endpoint?.method || 'POST',
    });
  });

  const categoryNames = Object.keys(categoriesMap);

  const toggleCategory = (catName) => {
    setOpenCategories((prev) => ({
      ...prev,
      [catName]: prev[catName] === undefined ? false : !prev[catName],
    }));
  };

  const handleEndpointClick = (endpointId) => {
    if (onSelectEndpoint) {
      onSelectEndpoint(endpointId);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside
      className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
      aria-label="API Documentation Navigation"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Brand Header & Mobile Close Button */}
      <div className={styles.sidebarHeader}>
        <Link
          href="/apis/oauth-token"
          className={styles.homeBadge}
          onClick={() => onClose && onClose()}
        >
          <span className={styles.homeIcon}>
            <img
              src="/assets/logo.png"
              alt="DigitalRakshak Logo"
              style={{ height: '20px' }}
            />
          </span>
          <span className={styles.homeText}>DigitalRakshak APIs</span>
        </Link>

        {/* Close Button - Visible on Tablet and Mobile */}
        <button
          type="button"
          className={styles.sidebarCloseBtn}
          onClick={onClose}
          aria-label="Close navigation sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Search Input Box */}
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search for APIs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          aria-label="Search APIs"
        />
        {searchTerm ? (
          <button
            type="button"
            className={styles.searchClearBtn}
            onClick={() => setSearchTerm('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        ) : (
          <span className={styles.searchIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        )}
      </div>

      {/* Categories Navigation */}
      <nav className={styles.sidebarNav}>
        {categoryNames.map((catName) => {
          const filteredEndpoints = categoriesMap[catName].filter((ep) =>
            ep.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (filteredEndpoints.length === 0) return null;

          const isCatOpen = openCategories[catName] !== false;

          return (
            <div key={catName} className={styles.categoryGroup}>
              <button
                type="button"
                className={styles.categoryTitle}
                onClick={() => toggleCategory(catName)}
                aria-expanded={isCatOpen}
              >
                <span className={styles.categoryTitleLeft}>
                  <span className={styles.greenDot}></span>
                  <span className={styles.catName}>{catName}</span>
                </span>
                <span className={`${styles.categoryChevron} ${isCatOpen ? styles.chevronRotated : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              {isCatOpen && (
                <div className={styles.endpointList}>
                  {filteredEndpoints.map((ep) => {
                    const href = `/apis/${ep.id}`;
                    const isActive = pathname === href || activeEndpoint === ep.id;
                    return (
                      <Link
                        key={ep.id}
                        href={href}
                        className={`${styles.endpointItem} ${isActive ? styles.activeEndpoint : ''
                          }`}
                        onClick={() => handleEndpointClick(ep.id)}
                      >
                        <span className={`${styles.methodBadge} ${styles[ep.method.toLowerCase()] || styles.post}`}>
                          {ep.method}
                        </span>
                        <span className={styles.epName}>{ep.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

