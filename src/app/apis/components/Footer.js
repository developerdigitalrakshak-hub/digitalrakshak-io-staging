'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.scss';

// Clean SVG Icons for Social Media
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const platformsData = [
  { name: 'API Hub', href: '/apis/oauth-token' },
  {
    name: 'Paperless Solution',
    href: '#',
    subitems: [
      { name: 'e-Sign Solution', href: '/e-stamp-and-e-sign' },
      { name: 'e-Stamping Solution', href: '/e-stamp-and-e-sign' },
      { name: 'e-Onboarding Platform', href: '#' },
    ],
  },
];

const servicesData = [
  { name: 'e-KYC', href: '/identity-ekyc' },
  { name: 'CKYC 2.0 Verification', href: '#' },
  {
    name: 'Background Verification (BGV)',
    href: '#',
    subservices: [
      { name: 'ID Verification', href: '#' },
      { name: 'Employee Verification', href: '#' },
      { name: 'Education Verification', href: '#' },
      { name: 'Employment History', href: '#' },
      { name: 'Address Check (Digital & Physical)', href: '#' },
    ],
  },
];

const socialLinks = [
  { Icon: LinkedInIcon, href: 'https://www.linkedin.com/company/idigitalrakshak/', label: 'LinkedIn' },
  { Icon: FacebookIcon, href: 'https://www.facebook.com/iDigitalRakshak', label: 'Facebook' },
  { Icon: InstagramIcon, href: 'https://www.instagram.com/idigitalrakshak/', label: 'Instagram' },
  { Icon: TwitterIcon, href: 'https://x.com/iDigitalRakshak', label: 'Twitter / X' },
  { Icon: YouTubeIcon, href: 'https://www.youtube.com/@iDigitalRakshak', label: 'YouTube' },
];

export default function Footer() {
  const startYear = 2025;
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerRoot} aria-label="Site Footer">
      {/* Ambient Top Glow */}
      <div className={styles.ambientGlow} />

      <div className={styles.footerContainer}>
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.brandTitleGroup}>
            <Link href="/" className={styles.brandTitleLink}>
              <p className={styles.brandTitle}>
                DigitalRakshak<sup>TM</sup>
              </p>
            </Link>
            <span className={styles.brandTagline}>
              SECURE | SWIFT | COMPLIANT
            </span>
          </div>

          {/* Large Logo Emblem */}
          <div className={styles.bigLogoWrapper}>
            <Image
              alt="DigitalRakshak Logo"
              className={styles.bigLogoImage}
              src="/assets/logo.png"
              width={190}
              height={117}
              priority
            />
          </div>

          {/* Social Icons with Glass Badges */}
          <div className={styles.socialRow}>
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialBtn}
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Platforms & Software Column */}
        <div className={styles.navCol}>
          <h4 className={styles.colHeading}>Platforms &amp; Software</h4>
          <div className={styles.platformsList}>
            {platformsData.map((item) => (
              <div key={item.name} className={styles.platformItem}>
                <Link
                  href={item.href}
                  className={styles.bulletLink}
                  onClick={(e) => {
                    if (item.href === '#') e.preventDefault();
                  }}
                >
                  <span className={styles.bulletDot}>•</span>
                  <span>{item.name}</span>
                </Link>

                {item.subitems && item.subitems.length > 0 && (
                  <div className={styles.subItemList}>
                    {item.subitems.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={styles.subItemLink}
                        onClick={(e) => {
                          if (sub.href === '#') e.preventDefault();
                        }}
                      >
                        <span className={styles.subItemDash}>-</span>
                        <span>{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Services Column */}
        <div className={styles.navCol}>
          <h4 className={styles.colHeading}>Services</h4>
          <div className={styles.linksList}>
            {servicesData.map((item) => (
              <div key={item.name} className={styles.serviceItem}>
                <Link
                  href={item.href}
                  className={styles.colLink}
                  onClick={(e) => {
                    if (item.href === '#') e.preventDefault();
                  }}
                >
                  {item.name}
                </Link>
                {item.subservices && item.subservices.length > 0 && (
                  <div className={styles.subserviceList}>
                    {item.subservices.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className={styles.subserviceLink}
                        onClick={(e) => {
                          if (sub.href === '#') e.preventDefault();
                        }}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Policies Column */}
        <div className={styles.navCol}>
          <h4 className={styles.colHeading}>Policies</h4>
          <div className={styles.linksList}>
            <Link href="/policies" className={styles.colLink}>
              API use T&C
            </Link>
          </div>

          {/* Compliance & Security Trust Card */}
          <div className={styles.trustCard}>
            <span className={styles.trustTitle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Enterprise Security
            </span>
            <p className={styles.trustText}>
              Bank-grade 256-bit encryption.<br />
              RBI &amp; IT Act 2000 compliant.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Live Status */}
      <div className={styles.bottomBar}>
        <p className={styles.copyrightText}>
          &copy; {startYear}&ndash;{String(currentYear).slice(-2)} DigitalRakshak InfoTech Pvt. Ltd. All rights reserved.
        </p>

        <div className={styles.statusIndicator}>
          <span className={styles.statusDot} />
          <span>All Systems Operational</span>
        </div>
      </div>
    </footer>
  );
}
