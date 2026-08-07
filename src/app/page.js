'use client';

import Navbar from './components/Navbar';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        {/* Hero Section */}
        <main className={styles.hero}>
          <div className={styles.badge}>
            <span className={styles.dot}></span>
            Next.js App Router & SASS / SCSS
          </div>

          <h1 className={styles.title}>
            Modern Floating Header with <br />
            <span className={styles.gradientText}>Smooth Scroll Animation</span>
          </h1>

          <p className={styles.subtitle}>
            Scroll down to watch the floating pill navbar smoothly transition into a full-width sticky header at the top of the viewport.
          </p>

          <div className={styles.ctaGroup}>
            <button className={styles.primaryBtn} onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}>
              Scroll Down to Test
            </button>
            <a
              href="https://nextjs.org/docs/app/building-your-application/styling/sass"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              Next.js Docs ↗
            </a>
          </div>
        </main>

        {/* Features Grid */}
        <section id="product" className={styles.featuresGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>✨</div>
            <h3 className={styles.cardTitle}>Floating Pill Mode</h3>
            <p className={styles.cardDesc}>
              Initially sits centered with top margin, rounded borders, glassmorphic backdrop-filter blur, and subtle border glow.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🌊</div>
            <h3 className={styles.cardTitle}>Scroll Transition</h3>
            <p className={styles.cardDesc}>
              Smooth 0.35s cubic-bezier animation expands header to full width, removes border radius, and docks at top: 0px.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🎨</div>
            <h3 className={styles.cardTitle}>SASS Styling</h3>
            <p className={styles.cardDesc}>
              Built with SASS module nesting, mixins, variables, and responsive media queries without external UI library bloat.
            </p>
          </div>
        </section>

        {/* Code Showcase Section */}
        <section id="solutions" className={styles.codeSection}>
          <div className={styles.codeHeader}>
            <div className={styles.codeTitle}>
              <span>🛠️ Navbar SCSS Module</span>
            </div>
            <span className={styles.langBadge}>Navbar.module.scss</span>
          </div>
          <div className={styles.codeBlock}>
            <pre>
              <code>{`<span class="${styles.variable}">.navbar</span> {
  <span class="${styles.property}">position</span>: fixed;
  <span class="${styles.property}">top</span>: 24px;
  <span class="${styles.property}">left</span>: 50%;
  <span class="${styles.property}">transform</span>: translateX(-50%);
  <span class="${styles.property}">width</span>: calc(100% - 48px);
  <span class="${styles.property}">border-radius</span>: 16px;
  <span class="${styles.property}">transition</span>: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  <span class="${styles.variable}">&.scrolled</span> {
    <span class="${styles.property}">top</span>: 0;
    <span class="${styles.property}">width</span>: 100%;
    <span class="${styles.property}">border-radius</span>: 0;
  }
}`}</code>
            </pre>
          </div>
        </section>

        {/* Extra Content Sections for Scrolling */}
        <section id="pricing" className={styles.codeSection} style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 800 }}>Seamless Integration</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            The navbar detects window scroll events using standard React hooks and applies SCSS module classes for maximum performance and 60fps animation smooth transitions.
          </p>
        </section>

        {/* Footer */}
        <footer id="resources" className={styles.footer}>
          <p>Built with Next.js 16 • Powered by SASS / SCSS Modules • JavaScript Edition</p>
        </footer>
      </div>
    </>
  );
}
