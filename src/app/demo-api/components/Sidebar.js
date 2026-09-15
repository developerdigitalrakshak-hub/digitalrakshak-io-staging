'use client';

import { useState } from 'react';
import styles from '../styles/demoApi.module.scss';

export default function Sidebar({ data, activeEndpoint, onSelectEndpoint }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const categories = [
    {
      id: 'geo-fencing',
      title: data.meta.title || 'Geo Fencing_S',
      endpoints: [
        {
          id: 'geo-fencing-s',
          name: data.meta.title || 'Geo Fencing_S',
          method: data.endpoint.method || 'POST',
        },
      ],
    },
  ];

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    endpoints: cat.endpoints.filter((ep) =>
      ep.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((cat) => cat.endpoints.length > 0);

  return (
    <aside className={styles.sidebar}>
      {/* Top Brand / Home line */}
      <div className={styles.sidebarHeader}>
        <div className={styles.homeBadge}>
          <span className={styles.homeIcon}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          <span className={styles.homeText}>Home</span>
        </div>
        <span className={styles.logoutArrow}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
        </span>
      </div>

      {/* Search Input Box */}
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search for APIs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <span className={styles.searchIcon}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
      </div>

      {/* Back Button */}
      <button className={styles.backButton}>
        <span className={styles.backChevron}>&lt;</span> Back
      </button>

      {/* Categories Navigation */}
      <nav className={styles.sidebarNav}>
        {filteredCategories.map((cat) => (
          <div key={cat.id} className={styles.categoryGroup}>
            <div
              className={styles.categoryTitle}
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              <span className={styles.greenDot}></span>
              <span className={styles.catName}>{cat.title}</span>
            </div>

            {isCategoryOpen && (
              <div className={styles.endpointList}>
                {cat.endpoints.map((ep) => (
                  <div
                    key={ep.id}
                    className={`${styles.endpointItem} ${
                      activeEndpoint === ep.id ? styles.activeEndpoint : ''
                    }`}
                    onClick={() => onSelectEndpoint && onSelectEndpoint(ep.id)}
                  >
                    <span className={styles.epName}>{ep.name}</span>
                    <span className={`${styles.methodBadge} ${styles[ep.method.toLowerCase()]}`}>
                      {ep.method}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
