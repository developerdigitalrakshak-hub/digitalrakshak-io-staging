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

  const navLinks = [
    { name: 'API Product', href: '/apis/oauth-token' },
    { name: 'BGV', href: '/bank-account-verification' },
    { name: 'E-stamping', href: '/e-stamp-and-e-sign' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={styles.headerRoot}>
        {/* 1. Full-width top backdrop: visible initially, smoothly fades out on scroll */}
        <div
          className={`${styles.backdropBar} ${isScrolled ? styles.scrolled : ''}`}
          aria-hidden="true"
        />

        {/* 2. Main Navigation Bar */}
        <div className={`${styles.navWrapper} ${isScrolled ? styles.scrolled : ''}`}>
          <div className={`${styles.navRow} ${isScrolled ? styles.scrolled : ''}`}>
            {/* Left: DigitalRakshak Logo with subtle glowing aura */}
            <Link href="/" className={styles.logoContainer} aria-label="DigitalRakshak Home">
              <div className={styles.logoGlow} aria-hidden="true" />
              <img
                src="/assets/logo.png"
                alt="DigitalRakshak Logo"
                className={`${styles.logoImg} ${isScrolled ? styles.scrolled : ''}`}
              />
            </Link>

            {/* Center: Rounded Dark Capsule Pill Navigation */}
            <nav
              className={`${styles.capsuleNav} ${isScrolled ? styles.scrolled : ''}`}
              aria-label="Main Navigation"
            >
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${styles.navLink} ${isScrolled ? styles.scrolled : ''}`}
                >
                  <span>{item.name}</span>
                  <span className={styles.navUnderline} aria-hidden="true" />
                </a>
              ))}
            </nav>

            {/* Right: "Get API Key" Pill Button */}
            <div className={styles.rightActions}>
              <button
                type="button"
                onClick={openRegisterModal}
                className={`${styles.bookDemoBtn} ${isScrolled ? styles.scrolled : ''}`}
                aria-label="Get API Key - Open Registration"
              >
                Get API Key
              </button>
            </div>

            {/* Mobile Menu Toggle Button (SVG Icons - Zero External Packages) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.mobileToggleBtn}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown matching content width */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenuDropdown}>
            <div className={styles.mobileMenuCard}>
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.mobileNavLink}
                >
                  {item.name}
                </a>
              ))}
              <div className={styles.mobileMenuDivider} />
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRegisterModal();
                }}
                className={styles.mobileBookDemoBtn}
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
