'use client';

import React from 'react';
import GstNavbar from '../apis/components/GstNavbar';
import ParticleBackground from '../apis/components/ParticleBackground';
import Footer from '../apis/components/Footer';
import { policySections, policiesMetadata } from './policiesData';
import styles from './policies.module.scss';

// Clean SVG Icons for visual hierarchy
function DocIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
      <path d="M7 21h10"/>
      <path d="M12 3v18"/>
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export default function PoliciesPage() {
  return (
    <div className={styles.policiesPage}>
      {/* Ambient Particle Starfield Background */}
      <ParticleBackground />

      {/* Subtle Ambient Top Glow */}
      <div className={styles.ambientGlowTop} aria-hidden="true" />

      {/* Global Brand Navbar */}
      <GstNavbar onToggleApiSidebar={() => {}} />

      {/* ════════════════════════════════════════
          HERO BANNER (Matches user screenshot layout)
      ════════════════════════════════════════ */}
      <header className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <ShieldCheckIcon />
            <span>DigitalRakshak Legal &amp; Compliance Center</span>
          </div>

          <h1 className={styles.heroTitle}>
            Privacy Policy &amp; <span className={styles.heroTitleHighlight}>Terms of Use</span>
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
          MAIN BODY (Centered Policy Cards)
      ════════════════════════════════════════ */}
      <main className={styles.mainContent}>
        {policySections.map((sec) => {
          const isSchedule = sec.id === 'schedule-1';

          return (
            <section
              key={sec.id}
              id={sec.id}
              className={`${styles.policyCard} ${isSchedule ? styles.scheduleCard : ''}`}
            >
              <div className={styles.cardHeader}>
                <div className={`${styles.iconBox} ${isSchedule ? styles.scheduleIcon : ''}`}>
                  {isSchedule ? <ShieldCheckIcon /> : <DocIcon />}
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

        {/* Grievance & Legal Contact Officer Card */}
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
  );
}
