'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navbarInner}>
        {/* Logo */}
        <Link href="/" className={styles.navbarLogo} aria-label="Home">
          <div className={styles.logoBadge}>RD</div>
          <span>DEMO<span className={styles.logoHighlight}>LOGO</span></span>
        </Link>

        {/* Nav links */}
        <ul className={styles.navbarLinks} role="navigation">
          <li>
            <a href="#product" className={styles.navbarLink}>
              Product
            </a>
          </li>
          <li>
            <a href="#solutions" className={styles.navbarLink}>
              Solutions
            </a>
          </li>
          <li>
            <a href="#pricing" className={styles.navbarLink}>
              Pricing
            </a>
          </li>
          <li>
            <a href="#resources" className={styles.navbarLink}>
              Resources
            </a>
          </li>
        </ul>

        {/* CTA buttons + Theme Toggle */}
        <div className={styles.navbarCta}>
          <button
            className={styles.themeToggleBtn}
            onClick={toggleTheme}
            aria-label="Toggle Light and Dark mode"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <a href="#login" className={`${styles.navbarBtn} ${styles.navbarBtnGhost}`}>
            Log in
          </a>
          <a href="#demo" className={`${styles.navbarBtn} ${styles.navbarBtnPrimary}`}>
            Get a demo
          </a>
        </div>
      </div>
    </nav>
  );
}
