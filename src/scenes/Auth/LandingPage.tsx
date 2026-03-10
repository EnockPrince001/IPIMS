// src/scenes/Auth/LandingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const goToSignIn = () => navigate('/signin');

  return (
    <div className="landing-page">
      {/* ── NAV ── */}
      <nav>
        <div className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
          <div className="li">💊</div>
          <span>
            <span className="ip">IP</span>IMS
          </span>
        </div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-actions">
          <button className="btn-ghost" onClick={goToSignIn}>Log in</button>
          <button className="btn-primary" onClick={goToSignIn}>Get Started</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" id="home">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="dot" />
            Trusted by Pharmacies across Kenya
          </div>

          <h1 className="hero-title">
            Smart inventory<br />
            for your<br />
            <span className="boxed">pharmacy.</span>
          </h1>

          <p className="hero-sub">
            IPIMS streamlines stock management, reduces expiry losses, and keeps
            your dispensary running at peak efficiency — built for Kenyan
            pharmacies.
          </p>

          <div className="hero-cta">
            <button className="btn-cta" onClick={goToSignIn}>
              Get Started →
            </button>
            <button className="btn-cta-o">View Demo</button>
          </div>

          <div className="stats-strip">
            <div>
              <div className="stat-num">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div>
              <div className="stat-num">98%</div>
              <div className="stat-label">Stock Accuracy</div>
            </div>
            <div>
              <div className="stat-num">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-visual">
            {/* Mini card – top left */}
            <div className="mc mc-tl">
              <div className="mc-lbl">⚠ Low Stock Alert</div>
              <div className="mc-val">12 Items</div>
              <div className="mc-sub">Needs reorder today</div>
            </div>

            {/* Central floating card */}
            <div className="vcard">
              <div className="card-icon">💊</div>
              <div className="card-lbl">Inventory Overview</div>
              <div className="card-ttl">Stock Summary</div>

              <div className="ibars">
                {[
                  { name: 'Antibiotics', pct: 84 },
                  { name: 'Analgesics', pct: 61 },
                  { name: 'Antihypertensives', pct: 45 },
                  { name: 'Antivirals', pct: 92 },
                  { name: 'Vitamins & Supps.', pct: 28 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="ilr">
                      <span>{item.name}</span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="ibg">
                      <div className="ibf" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini card – bottom right */}
            <div className="mc mc-br">
              <div className="mc-lbl">🗓 Expiring Soon</div>
              <div className="mc-val" style={{ color: '#f4a261' }}>
                7 Batches
              </div>
              <div className="mc-sub">Next 30 days</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section" id="features">
        <div className="sec-lbl">What we offer</div>
        <h2 className="sec-ttl">
          Everything your pharmacy<br />
          needs to thrive
        </h2>
        <p className="sec-sub">
          From real-time stock tracking to automated reorder alerts — IPIMS
          handles it all.
        </p>

        <div className="fgrid">
          {[
            {
              icon: '📦',
              title: 'Real-Time Stock Tracking',
              desc: 'Monitor every medicine with live inventory counts, batch numbers, and expiry dates — updated instantly across your dispensary.',
            },
            {
              icon: '🔔',
              title: 'Smart Reorder Alerts',
              desc: 'Automatic notifications when stock falls below minimum thresholds, so you never run out of critical medications.',
            },
            {
              icon: '📊',
              title: 'Sales & Usage Analytics',
              desc: 'Understand dispensing patterns, peak hours, and top-selling products with clear, actionable dashboards.',
            },
            {
              icon: '🗓',
              title: 'Expiry Management',
              desc: 'Track expiry dates for every batch and receive advance warnings to minimize losses and maintain patient safety.',
            },
            {
              icon: '👥',
              title: 'Multi-User Access',
              desc: 'Role-based access for pharmacists, assistants, and administrators — each with appropriate, secure permissions.',
            },
            {
              icon: '🏥',
              title: 'Supplier Management',
              desc: 'Manage supplier contacts, purchase orders, and delivery histories in one streamlined, organized hub.',
            },
          ].map((f) => (
            <div className="fc" key={f.title}>
              <div className="fi">{f.icon}</div>
              <div className="ft">{f.title}</div>
              <div className="fd">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div className="cta-band" id="about">
        <div>
          <div className="cta-ttl">
            Ready to transform your<br />
            pharmacy in Nakuru?
          </div>
          <div className="cta-sub">
            Join pharmacies already using IPIMS to reduce losses and serve
            patients better.
          </div>
        </div>
        <button
          className="btn-cta"
          onClick={goToSignIn}
          style={{ whiteSpace: 'nowrap', flexShrink: 0, fontSize: '1rem', padding: '16px 32px' }}
        >
          Start Free Trial →
        </button>
      </div>

      {/* ── FOOTER ── */}
      <footer id="contact">
        <div className="fb">
          <span className="ip">IP</span>IMS
        </div>
        <div>© 2026 Intelligent Pharmacy Inventory Management System · Nakuru, Kenya</div>
        <div>Privacy · Terms · Support</div>
      </footer>
    </div>
  );
};

export default LandingPage;
