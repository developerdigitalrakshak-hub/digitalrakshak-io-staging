'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ParticleBackground from './components/ParticleBackground';
import Sidebar from './components/Sidebar';
import GstNavbar from './components/GstNavbar';
import Footer from './components/Footer';
import initialApiData from './data/apiData.json';
import styles from './styles/apiDocs.module.scss';

export default function ApisLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile drawer when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={styles.pageContainer}>
      {/* Ambient Particle Starfield Background */}
      <ParticleBackground />

      {/* Global Top Navbar */}
      <GstNavbar onToggleApiSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {/* Top Mobile & Tablet Sub-bar with Hamburger to open API endpoints */}
      <header className={styles.mobileNavbar}>
        <div className={styles.mobileNavbarLeft}>
          <button
            type="button"
            className={`${styles.hamburgerBtn} ${isMobileMenuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
            id="mobileHamburgerBtn"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>

          <div className={styles.mobileBrand}>
            <span className={styles.mobileBrandIcon}>
              <img
                src="/assets/logo.png"
                alt="DigitalRakshak Logo"
                style={{ height: '20px' }}
              />
            </span>
            <span className={styles.mobileBrandTitle}>DigitalRakshak</span>
            <span className={styles.mobileBrandBadge}>APIs</span>
          </div>
        </div>

        <button
          type="button"
          className={styles.mobileMenuIndicator}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Browse APIs"
        >
          <span>All APIs</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </header>

      {/* Blurred Backdrop Overlay when drawer is open */}
      <div
        className={`${styles.sidebarOverlay} ${isMobileMenuOpen ? styles.sidebarOverlayVisible : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div className={styles.mainLayout}>
        {/* Left Sidebar Navigation - Sticky on desktop, Off-canvas drawer on mobile/tablet */}
        <Sidebar
          data={initialApiData}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Right Content Area - Main API Docs & Sandbox */}
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}

