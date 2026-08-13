import { useState, useEffect } from 'react';
import { seal } from '../pookalam.js';

export default function Navbar({ onNavigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const navSeal = seal({ counts: [6, 12], hue: 'gold', label: 'Technocrats Emblem' });

  const handleLink = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
    if (hash.startsWith('/')) {
      onNavigate(hash);
    } else {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  };

  const NAV_LINKS = [
    { href: '#about', label: 'About' },
    { href: '#events', label: 'Events' },
    { href: '#participate', label: 'Participate' },
    { href: '#schedule', label: 'Schedule' },
  ];

  return (
    <header className={`nav${menuOpen ? ' is-open' : ''}`} id="nav">
      <div className="nav__in">

        {/* ── ZONE 1: BRAND (EXTREME LEFT WITH COMFORTABLE PADDING) ── */}
        <div className="nav__left">
          <a
            className="brand"
            href="#/"
            onClick={(e) => handleLink(e, '/')}
            aria-label="TECHAVAM 2026 home"
          >
            <span
              className="brand__seal"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: navSeal }}
            />
            <span className="brand__txt">
              <span className="brand__name">TECHAVAM 2026</span>
              <span className="brand__sub">Technocrats</span>
            </span>
          </a>
        </div>

        {/* ── ZONE 2: NAVIGATION LINKS (PERFECTLY CENTERED) ── */}
        <nav className="nav__center nav__links" id="navLinks" aria-label="Main navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              className="nav__link"
              href={href}
              onClick={(e) => handleLink(e, href)}
            >
              {label}
            </a>
          ))}

          {/* Mobile CTA inside menu sheet */}
          <div className="nav__mobile-cta">
            <a
              className="btn btn--gold"
              href="#/register"
              onClick={(e) => handleLink(e, '/register')}
            >
              Register <span className="btn__arrow">→</span>
            </a>
          </div>
        </nav>

        {/* ── ZONE 3: REGISTER BUTTON (EXTREME RIGHT WITH COMFORTABLE PADDING) ── */}
        <div className="nav__right">
          <a
            className="btn btn--gold nav__btn-desktop"
            href="#/register"
            onClick={(e) => handleLink(e, '/register')}
          >
            Register <span className="btn__arrow">→</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className="nav__toggle"
            id="navToggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="navLinks"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
          </button>
        </div>

      </div>
    </header>
  );
}
