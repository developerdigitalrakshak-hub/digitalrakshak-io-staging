/* eslint-disable react-hooks/refs */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRegisterModal } from '@/context/RegisterModalContext';
import ParticleBackground from './apis/components/ParticleBackground';
import GstNavbar from './apis/components/GstNavbar';
import Footer from './apis/components/Footer';
import styles from './page.module.scss';

// ── Animated Counter Hook ──
function useCountUp(target, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startOnView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, startOnView]);

  return { count, ref };
}

// ── Scroll Reveal Hook ──
function useScrollReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

// ── Feature Card ──
function FeatureCard({ icon, title, description, delay = 0 }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${styles.featureCard} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.featureIconWrap}>
        <span className={styles.featureIcon}>{icon}</span>
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
      <div className={styles.featureGlow} aria-hidden="true" />
    </div>
  );
}

// ── Building Block Card ──
function BuildingBlockCard({ icon, title, description, color, href = '/apis/oauth-token', delay = 0 }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <Link
      href={href}
      ref={ref}
      className={`${styles.blockCard} ${isVisible ? styles.visible : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={styles.blockIconWrap} style={{ background: color }}>
        <span className={styles.blockIcon}>{icon}</span>
      </div>
      <div className={styles.blockContent}>
        <h4 className={styles.blockTitle}>{title}</h4>
        <p className={styles.blockDesc}>{description}</p>
      </div>
      <div className={styles.blockArrow}>→</div>
    </Link>
  );
}

// ── Root Home Page Component ──
export default function HomePage() {
  const { openRegisterModal } = useRegisterModal();
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Parallax subtle mouse tracking for hero code visual
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 16,
        y: (e.clientY / window.innerHeight - 0.5) * 16,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Stats Counters
  const stat1 = useCountUp(500, 2200);
  const stat2 = useCountUp(99, 2000);
  const stat3 = useCountUp(50, 1800);
  const stat4 = useCountUp(10, 1600);

  const section2 = useScrollReveal();
  const section3 = useScrollReveal();
  const section4 = useScrollReveal();
  const section5 = useScrollReveal();

  return (
    <div className={styles.pageContainer}>
      {/* Exact APIs Section Background Animation */}
      <ParticleBackground />

      {/* Subtle Ambient Glows */}
      <div className={styles.ambientGlowTop} aria-hidden="true" />
      <div className={styles.ambientGlowMid} aria-hidden="true" />

      {/* Global Top Navbar */}
      <GstNavbar onToggleApiSidebar={() => {}} />

      <main>
        {/* ═══════════════════════════════════════════════
            SECTION 1: HERO
        ═══════════════════════════════════════════════ */}
        <section className={styles.heroSection} ref={heroRef}>
          <div className={styles.heroContent}>
            {/* Animated Badge */}
            <div className={styles.heroBadge}>
              <span className={styles.heroBadgeDot} />
              <span>Platform for Developers</span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.heroTitle}>
              <span className={styles.heroLine1}>Building Block APIs</span>
              <span className={styles.heroLine2}>
                for <span className={styles.gradientText}>EPIC</span> Digital Journeys
              </span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              DigitalRakshak.IO is a technology-focused framework designed to help developers 
              create expansive, high-impact digital experiences. Combine modular APIs like 
              LEGO bricks to unleash infinite possibilities.
            </p>

            {/* CTA Buttons */}
            <div className={styles.heroCtas}>
              <Link href="/apis/oauth-token" className={styles.ctaPrimary}>
                <span>Explore APIs</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <button type="button" onClick={openRegisterModal} className={styles.ctaSecondary}>
                <span>Get API Key</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className={styles.trustRow}>
              <div className={styles.trustItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span>SOC-2 Certified</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span>99.99% SLA Uptime</span>
              </div>
              <div className={styles.trustDivider} />
              <div className={styles.trustItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                <span>Sub-10ms Latency</span>
              </div>
            </div>
          </div>

          {/* Hero Visual — Code Terminal Window */}
          <div
            className={styles.heroVisual}
            style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
            }}
          >
            <div className={styles.heroCodeWindow}>
              <div className={styles.codeWindowBar}>
                <span className={styles.codeWindowDot} style={{ background: '#ef4444' }} />
                <span className={styles.codeWindowDot} style={{ background: '#f59e0b' }} />
                <span className={styles.codeWindowDot} style={{ background: '#10b981' }} />
                <span className={styles.codeWindowTitle}>digitalrakshak-journey.js</span>
              </div>
              <div className={styles.codeWindowBody}>
                <pre>
                  <code>
                    <span className={styles.codeComment}>// 🧱 1. Stack modular building block APIs</span>{'\n'}
                    <span className={styles.codeKeyword}>import</span> {'{'} RakshakHub {'}'} <span className={styles.codeKeyword}>from</span> <span className={styles.codeStr}>'@digitalrakshak/sdk'</span>;{'\n\n'}
                    <span className={styles.codeKeyword}>const</span> <span className={styles.codeVar}>hub</span> = <span className={styles.codeKeyword}>new</span> <span className={styles.codeFn}>RakshakHub</span>({'{'}{'\n'}
                    {'  '}<span className={styles.codeProp}>apiKey</span>: <span className={styles.codeStr}>process.env.RAKSHAK_KEY</span>,{'\n'}
                    {'  '}<span className={styles.codeProp}>mode</span>: <span className={styles.codeStr}>'production'</span>,{'\n'}
                    {'}'});{'\n\n'}
                    <span className={styles.codeComment}>// 🚀 2. Compose EPIC user journeys</span>{'\n'}
                    <span className={styles.codeKeyword}>const</span> <span className={styles.codeVar}>journey</span> = <span className={styles.codeKeyword}>await</span> <span className={styles.codeVar}>hub</span>.{'\n'}
                    {'  '}<span className={styles.codeFn}>auth</span>({'{'} <span className={styles.codeProp}>type</span>: <span className={styles.codeStr}>'oauth2'</span> {'}'}).{'\n'}
                    {'  '}<span className={styles.codeFn}>verifyIdentity</span>({'{'} <span className={styles.codeProp}>aadhaar</span>, <span className={styles.codeProp}>pan</span> {'}'}).{'\n'}
                    {'  '}<span className={styles.codeFn}>executeBankVerification</span>({'{'} <span className={styles.codeProp}>account</span> {'}'}).{'\n'}
                    {'  '}<span className={styles.codeFn}>eSignDocument</span>({'{'} <span className={styles.codeProp}>docId</span> {'}'});{'\n\n'}
                    <span className={styles.codeComment}>// ✨ 3. Unleash infinite possibilities!</span>{'\n'}
                    <span className={styles.codeVar}>console</span>.<span className={styles.codeFn}>log</span>(<span className={styles.codeStr}>'Journey Completed:'</span>, <span className={styles.codeVar}>journey</span>.<span className={styles.codeProp}>status</span>);
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 2: METRICS & STATS
        ═══════════════════════════════════════════════ */}
        <section className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem} ref={stat1.ref}>
              <span className={styles.statNumber}>{stat1.count}M+</span>
              <span className={styles.statLabel}>API Calls Processed</span>
            </div>
            <div className={styles.statItem} ref={stat2.ref}>
              <span className={styles.statNumber}>{stat2.count}.99%</span>
              <span className={styles.statLabel}>Service Availability</span>
            </div>
            <div className={styles.statItem} ref={stat3.ref}>
              <span className={styles.statNumber}>{stat3.count}+</span>
              <span className={styles.statLabel}>Building Block APIs</span>
            </div>
            <div className={styles.statItem} ref={stat4.ref}>
              <span className={styles.statNumber}>&lt;{stat4.count}ms</span>
              <span className={styles.statLabel}>Average API Response</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 3: BUILDING BLOCK APIS
        ═══════════════════════════════════════════════ */}
        <section
          className={`${styles.blocksSection} ${section2.isVisible ? styles.visible : ''}`}
          ref={section2.ref}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Modular Architecture</span>
            <h2 className={styles.sectionTitle}>
              Building <span className={styles.gradientText}>Block</span> APIs
            </h2>
            <p className={styles.sectionSubtitle}>
              Modular, reusable components. Like LEGO bricks, developers can stack, connect, 
              and configure these foundational tools to build scalable systems in record time.
            </p>
          </div>

          <div className={styles.blocksGrid}>
            <BuildingBlockCard
              icon="🔐"
              title="OAuth 2.0 & Token Engine"
              description="Enterprise-grade token authentication, role-based scope access, and JWT lifecycle management."
              color="linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))"
              delay={0}
            />
            <BuildingBlockCard
              icon="🏦"
              title="Bank Account Verification"
              description="Real-time penny-drop verification, UPI validation, and IFSC lookup with automated reconciliation."
              color="linear-gradient(135deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2))"
              delay={100}
            />
            <BuildingBlockCard
              icon="📜"
              title="E-Stamping & Digital Sign"
              description="Legally binding digital stamp generation with Aadhaar eSign and cryptographic non-repudiation."
              color="linear-gradient(135deg, rgba(236,72,153,0.2), rgba(244,63,94,0.2))"
              delay={200}
            />
            <BuildingBlockCard
              icon="🪪"
              title="Identity & KYC Checks"
              description="Instant PAN, Aadhaar, Passport, and Voter ID validation with biometric face match."
              color="linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.2))"
              delay={300}
            />
            <BuildingBlockCard
              icon="📊"
              title="GST & Tax Verification"
              description="Automated GSTIN validation, return filing status, and comprehensive vendor compliance scoring."
              color="linear-gradient(135deg, rgba(245,158,11,0.2), rgba(251,191,36,0.2))"
              delay={400}
            />
            <BuildingBlockCard
              icon="⚡"
              title="Webhooks & Event Stream"
              description="Zero-latency push notifications with HMAC signatures, automatic retries, and dead-letter queues."
              color="linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.2))"
              delay={500}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 4: EPIC JOURNEYS
        ═══════════════════════════════════════════════ */}
        <section
          className={`${styles.journeysSection} ${section3.isVisible ? styles.visible : ''}`}
          ref={section3.ref}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Outcomes</span>
            <h2 className={styles.sectionTitle}>
              Powering <span className={styles.gradientText}>EPIC</span> Journeys
            </h2>
            <p className={styles.sectionSubtitle}>
              Transform modular code into massive, immersive user journeys. Deliver high-conversion 
              workflows that delight end users and scale seamlessly.
            </p>
          </div>

          <div className={styles.journeysGrid}>
            <FeatureCard
              icon="🌐"
              title="Enterprise Scalability"
              description="Built to handle spikes of up to 100,000 requests per second with distributed edge caching and automated failover."
              delay={0}
            />
            <FeatureCard
              icon="🛡️"
              title="End-to-End Compliance"
              description="Fully aligned with RBI, IT Act, and CERT-IN guidelines. Bank-grade 256-bit AES encryption at rest and in transit."
              delay={150}
            />
            <FeatureCard
              icon="💻"
              title="Sandbox & Quickstart"
              description="Interactive API playground with live sandbox credentials, multi-language code snippets (cURL, Python, Node, Java, Go)."
              delay={300}
            />
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 5: HOW IT WORKS
        ═══════════════════════════════════════════════ */}
        <section
          className={`${styles.howItWorksSection} ${section4.isVisible ? styles.visible : ''}`}
          ref={section4.ref}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Workflow</span>
            <h2 className={styles.sectionTitle}>
              How It <span className={styles.gradientText}>Works</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Get up and running in minutes with our developer-first integration workflow.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <h4 className={styles.stepTitle}>Get Your API Key</h4>
              <p className={styles.stepDesc}>
                Sign up and receive your API credentials in minutes. Start building immediately 
                with our full sandbox environment.
              </p>
            </div>
            <div className={styles.stepConnector}>
              <svg width="40" height="2" viewBox="0 0 40 2"><line x1="0" y1="1" x2="40" y2="1" stroke="rgba(99,102,241,0.4)" strokeWidth="2" strokeDasharray="4 4" /></svg>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <h4 className={styles.stepTitle}>Choose Your Blocks</h4>
              <p className={styles.stepDesc}>
                Select from our modular API library. Pick identity, banking, compliance, 
                or e-sign blocks for your specific use case.
              </p>
            </div>
            <div className={styles.stepConnector}>
              <svg width="40" height="2" viewBox="0 0 40 2"><line x1="0" y1="1" x2="40" y2="1" stroke="rgba(99,102,241,0.4)" strokeWidth="2" strokeDasharray="4 4" /></svg>
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <h4 className={styles.stepTitle}>Build & Launch</h4>
              <p className={styles.stepDesc}>
                Stack APIs together, test in sandbox, and go live. Scale to millions of 
                requests with zero infrastructure hassle.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 6: INFINITE POSSIBILITIES CTA
        ═══════════════════════════════════════════════ */}
        <section
          className={`${styles.ctaSection} ${section5.isVisible ? styles.visible : ''}`}
          ref={section5.ref}
        >
          <div className={styles.ctaCard}>
            <div className={styles.ctaGlow} aria-hidden="true" />
            <h2 className={styles.ctaTitle}>
              Unleash <span className={styles.gradientText}>Infinite</span> Possibilities
            </h2>
            <p className={styles.ctaSubtitle}>
              By combining simple, powerful foundational tools, creators face zero limitations on 
              what they can build, scale, or automate. Start your journey today.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/apis/oauth-token" className={styles.ctaPrimary}>
                <span>Start Building Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <button type="button" onClick={openRegisterModal} className={styles.ctaSecondary}>
                <span>Request Demo</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}
