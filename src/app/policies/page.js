'use client';

import React, { useState, useEffect } from 'react';
import GstNavbar from '../apis/components/GstNavbar';
import ParticleBackground from '../apis/components/ParticleBackground';
import Footer from '../apis/components/Footer';
import { policySections, policiesMetadata } from './policiesData';
import styles from './policies.module.scss';

// Clean SVG Icons for visual hierarchy
function DocIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ChevronRightIcon({ className }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const policyTitle = {
  schedule1: "Schedule I: Data Security Standards & Safeguards",
  privacyPolicy: "privacy-policy"
}

const MENU_ITEMS = [
  { id: policyTitle?.privacyPolicy, name: 'Privacy Policy & Terms' },
  { id: policyTitle?.schedule1, name: 'Schedule I: Data Security Standards & Safeguards' },
];

export default function PoliciesPage() {
  const [activePolicyId, setActivePolicyId] = useState(policyTitle?.privacyPolicy);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isSchedule = activePolicyId === policyTitle?.schedule1;

  // Filter sections without altering a single word from policySections
  const displayedSections = isSchedule
    ? policySections.filter((sec) => sec.id === policyTitle?.schedule1)
    : policySections.filter((sec) => sec.id !== policyTitle?.schedule1);

  // Close mobile drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const handleSelectPolicy = (id) => {
    setActivePolicyId(id);
    setIsDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeItem = MENU_ITEMS.find((item) => item.id === activePolicyId) || MENU_ITEMS[0];

  return (
    <div className={styles.policiesPage}>
      {/* Ambient Particle Starfield Background */}
      <ParticleBackground />

      {/* Subtle Ambient Top Glow */}
      <div className={styles.ambientGlowTop} aria-hidden="true" />

      {/* Global Brand Navbar */}
      <GstNavbar onToggleApiSidebar={() => { }} />

      {/* ════════════════════════════════════════
          MOBILE TOP SUB-BAR (Visible on mobile/tablet)
      ════════════════════════════════════════ */}
      <div className={styles.mobileNavbar}>
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className={styles.mobileMenuBtn}
          aria-label="Open Policies Menu"
        >
          <MenuIcon />
          <span>Policies</span>
        </button>

        <span className={styles.mobileActiveBadge}>
          {activeItem.name}
        </span>
      </div>

      {/* ════════════════════════════════════════
          MOBILE DRAWER (Slides in from Left)
      ════════════════════════════════════════ */}
      <div
        className={`${styles.mobileDrawerOverlay} ${isDrawerOpen ? styles.overlayOpen : ''}`}
        onClick={() => setIsDrawerOpen(false)}
        aria-hidden={!isDrawerOpen}
      />

      <aside
        className={`${styles.mobileDrawer} ${isDrawerOpen ? styles.drawerOpen : ''}`}
        aria-label="Mobile Policies Navigation"
      >
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Company Policies</span>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className={styles.drawerCloseBtn}
            aria-label="Close policies menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className={styles.drawerNav}>
          <p className={styles.categoryHeader}>POLICIES</p>
          {MENU_ITEMS.map((item) => {
            const isCurrent = item.id === activePolicyId;
            const isSchItem = item.id === policyTitle?.schedule1;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectPolicy(item.id)}
                className={`${styles.navItem} ${isCurrent ? styles.navItemActive : ''}`}
              >
                <div className={styles.navItemLeft}>
                  <span className={styles.navIcon}>
                    {isSchItem ? <ShieldCheckIcon /> : <DocIcon />}
                  </span>
                  <span className={styles.navText}>{item.name}</span>
                </div>
                {isCurrent && <ChevronRightIcon className={styles.navChevron} />}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ════════════════════════════════════════
          MAIN LAYOUT (Left Sidebar + Right Content)
      ════════════════════════════════════════ */}
      <div className={styles.policyLayoutWrapper}>
        {/* Left Desktop Sidebar (Hidden on Mobile) */}
        <aside className={styles.desktopSidebar} aria-label="Policies Navigation">
          <div className={styles.sidebarStickyInner}>
            <p className={styles.categoryHeader}>POLICIES</p>

            <nav className={styles.navList} aria-label="Policies Navigation List">
              {MENU_ITEMS.map((item) => {
                const isCurrent = item.id === activePolicyId;
                const isSchItem = item.id === policyTitle?.schedule1;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectPolicy(item.id)}
                    className={`${styles.navItem} ${isCurrent ? styles.navItemActive : ''}`}
                  >
                    <div className={styles.navItemLeft}>
                      <span className={styles.navIcon}>
                        {isSchItem ? <ShieldCheckIcon /> : <DocIcon />}
                      </span>
                      <span className={styles.navText}>{item.name}</span>
                    </div>
                    {isCurrent && <ChevronRightIcon className={styles.navChevron} />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Right Content Area: Exact Original Content */}
        <div className={styles.contentColumn}>
          {/* ════════════════════════════════════════
              HERO BANNER (Exact Original Text & Content)
          ════════════════════════════════════════ */}
          <header className={styles.heroBanner}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <ShieldCheckIcon />
                <span>DigitalRakshak Legal &amp; Compliance Center</span>
              </div>

              <h1 className={styles.heroTitle}>
                {isSchedule ? (
                  <>
                    Schedule I &amp; <span className={styles.heroTitleHighlight}>Data Security</span>
                  </>
                ) : (
                  <>
                    Privacy Policy &amp; <span className={styles.heroTitleHighlight}>Terms of Use</span>
                  </>
                )}
              </h1>

              <p className={styles.heroSubtitle}>
                {policiesMetadata.subtitle}
              </p>

              {/* Metadata Row / Chips */}
              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <DocIcon />
                  <span className="label">Effective:</span>
                  <span className="value">{policiesMetadata.effectiveDate}</span>
                </div>

                <div className={styles.metaItem}>
                  <CalendarIcon />
                  <span className="label">Version:</span>
                  <span className="value">{policiesMetadata.version}</span>
                </div>

                <div className={styles.metaItem}>
                  <CalendarIcon />
                  <span className="label">Last Updated:</span>
                  <span className="value">{policiesMetadata.lastUpdated}</span>
                </div>

                <div className={styles.metaItem}>
                  <ScaleIcon />
                  <span className="label">Jurisdiction:</span>
                  <span className="value">{policiesMetadata.jurisdiction}</span>
                </div>

                <div className={styles.metaItem}>
                  <MailIcon />
                  <span className="label">Grievance:</span>
                  <span className="value">{policiesMetadata.grievanceEmail}</span>
                </div>
              </div>
            </div>
          </header>

          {/* ════════════════════════════════════════
              MAIN BODY (Exact Original Policy Cards & Words)
          ════════════════════════════════════════ */}
          <main className={styles.mainContent}>
            {displayedSections.map((sec) => {
              const isScheduleCard = sec.id === policyTitle?.schedule1;

              return (
                <section
                  key={sec.id}
                  id={sec.id}
                  className={`${styles.policyCard} ${isScheduleCard ? styles.scheduleCard : ''}`}
                >
                  <div className={styles.cardHeader}>
                    <div className={`${styles.iconBox} ${isScheduleCard ? styles.scheduleIcon : ''}`}>
                      {isScheduleCard ? <ShieldCheckIcon /> : <DocIcon />}
                    </div>
                    <h2 className={styles.cardTitle}>{sec.title}</h2>
                  </div>

                  <div className={styles.cardBody}>
                    {sec.paragraphs.map((p, idx) => {
                      const isBullet =
                        /^[•\-\*]|^(\d+\.){2,}/.test(p) ||
                        p.startsWith('comply with') ||
                        p.startsWith('not do or permit') ||
                        p.startsWith('not to process') ||
                        p.startsWith('protect against') ||
                        p.startsWith('ensure protection');

                      const isDefinition = p.startsWith('“') && p.includes('”');

                      if (isDefinition) {
                        return (
                          <div key={idx} className={styles.definitionItem}>
                            {p}
                          </div>
                        );
                      }

                      if (isBullet) {
                        return (
                          <div key={idx} className={styles.bulletItem}>
                            {p.replace(/^[•\-\*]\s*/, '')}
                          </div>
                        );
                      }

                      return (
                        <p key={idx} className={styles.paragraph}>
                          {p}
                        </p>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* Grievance & Legal Contact Officer Card (Exact Original Text) */}
            <div className={styles.grievanceCard}>
              <div className={styles.grievanceInfo}>
                <h3 className={styles.grievanceTitle}>Questions or Grievances?</h3>
                <p className={styles.grievanceDesc}>
                  If you have any questions regarding these Terms, Data Security standards, or have a grievance, reach out to our designated Grievance &amp; Compliance Officer.
                </p>
              </div>
              <div className={styles.grievanceAction}>
                <a href={`mailto:${policiesMetadata.grievanceEmail}`}>
                  <MailIcon />
                  <span>Contact Grievance Officer</span>
                </a>
              </div>
            </div>
          </main>

          {/* Global Brand Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
