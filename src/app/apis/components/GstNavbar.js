'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRegisterModal } from '@/context/RegisterModalContext';
import styles from './GstNavbar.module.scss';

export default function GstNavbar({ onToggleApiSidebar }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openRegisterModal } = useRegisterModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Original menu items preserved exactly
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'API Products', href: '/apis/oauth-token' },
    // { name: 'BGV', href: '/bank-account-verification' },
    // { name: 'E-stamping', href: '/e-stamp-and-e-sign' },
    // { name: 'Pricing', href: '/pricing' },
    // { name: 'Resources', href: '/resources' },
    { name: 'Contact us', href: '#contact' },
  ];

  return (
    <>
      <header className={`${styles.headerRoot} ${isScrolled ? styles.scrolled : ''}`}>
        {/* Full-width top backdrop for unscrolled state */}
        <div
          className={`${styles.backdropBar} ${isScrolled ? styles.scrolled : ''}`}
          aria-hidden="true"
        />

        {/* Floating Capsule / Main Nav Container */}
        <div className={`${styles.capsuleNav} ${isScrolled ? styles.scrolled : ''}`}>
          {/* 1. Left: Brand Logo & Text */}
          <Link
            href="/"
            className={`${styles.brandLogoLink} ${isScrolled ? styles.scrolled : ''}`}
            aria-label="DigitalRakshak Home"
          >
            <div className={styles.logoGlow} aria-hidden="true" />
            <img
              src="/assets/logo.png"
              alt="DigitalRakshak Logo"
              className={`${styles.brandLogoImg} ${isScrolled ? styles.scrolled : ''}`}
            />
            <div className={styles.brandTextGroup}>
              <span className={styles.brandTitle}>
                DigitalRakshak<span className={styles.brandTm}>™</span>
              </span>
              <span className={styles.brandTagline}>
                SECURE <span className={styles.taglineSep}>|</span> SWIFT <span className={styles.taglineSep}>|</span> COMPLIANT
              </span>
            </div>
          </Link>

          {/* 2. Center: Navigation Links */}
          <nav className={styles.desktopNavGroup} aria-label="Main Navigation">
            {navLinks.map((item) =>
              item.name.toLowerCase().includes('contact') ? (
                <button
                  key={item.name}
                  type="button"
                  onClick={openRegisterModal}
                  className={`${styles.navLinkButton} ${isScrolled ? styles.scrolled : ''}`}
                  aria-label="Contact Us - Open Registration"
                >
                  <span>{item.name}</span>
                  <span className={styles.navUnderline} aria-hidden="true" />
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.navLinkButton} ${isScrolled ? styles.scrolled : ''}`}
                >
                  <span>{item.name}</span>
                  <span className={styles.navUnderline} aria-hidden="true" />
                </Link>
              )
            )}
          </nav>

          {/* 3. Right: "Get API Key" Pill CTA Button */}
          <div className={styles.rightActionsGroup}>
            <button
              type="button"
              onClick={openRegisterModal}
              className={`${styles.contactPillBtn} ${isScrolled ? styles.scrolled : ''}`}
              aria-label="Get API Key - Open Registration"
            >
              Get API Key
            </button>

            {/* API Sidebar Toggle for API Docs */}
            {onToggleApiSidebar && (
              <button
                type="button"
                onClick={onToggleApiSidebar}
                className={styles.apiSidebarToggleBtn}
                aria-label="Toggle API Endpoint List"
                title="API Endpoints"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h10M4 18h7" />
                </svg>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.mobileHamburgerBtn}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className={styles.mobileDrawerWrapper}>
            <div className={styles.mobileDrawerCard}>
              {navLinks.map((item) =>
                item.name.toLowerCase().includes('contact') ? (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openRegisterModal();
                    }}
                    className={styles.mobileDrawerLink}
                    aria-label="Contact Us - Open Registration"
                  >
                    <span>{item.name}</span>
                    <span className={styles.mobileLinkArrow}>→</span>
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.mobileDrawerLink}
                  >
                    <span>{item.name}</span>
                    <span className={styles.mobileLinkArrow}>→</span>
                  </Link>
                )
              )}
              <div className={styles.mobileDrawerDivider} />
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRegisterModal();
                }}
                className={styles.mobileContactActionBtn}
                aria-label="Get API Key - Open Registration"
              >
                Get API Key
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
