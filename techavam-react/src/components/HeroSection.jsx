import { useEffect, useRef } from 'react';
import KathakaliDancer from './KathakaliDancer.jsx';
import OnamRangoli from './OnamRangoli.jsx';
import { FEST } from '../config.js';

function MetaItem({ value, label }) {
  if (value) return <b>{value}</b>;
  return <span className="todo">ADD {label}</span>;
}

export default function HeroSection({ onNavigate }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const revEls = el.querySelectorAll('.rev');
    if (!('IntersectionObserver' in window)) {
      revEls.forEach((r) => r.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('is-in'), i * 80);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    revEls.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      {/* Subtle ambient lighting */}
      <div className="hero__blob hero__blob--top" aria-hidden="true" />
      <div className="hero__blob hero__blob--bottom" aria-hidden="true" />

      {/* Floating subtle tech/festive background micro-particles */}
      <div className="hero__decorations" aria-hidden="true">
        <span className="hero__decor hero__decor--1">✦</span>
        <span className="hero__decor hero__decor--2">✦</span>
        <span className="hero__decor hero__decor--3">{'< >'}</span>
        <span className="hero__decor hero__decor--4">{'{ }'}</span>
      </div>

      <div className="hero__in">

        {/* ── LEFT: KATHAKALI DANCER VISUAL ─────────────────── */}
        <div className="hero__art hero__art--left rev">
          <KathakaliDancer />
        </div>

        {/* ── CENTER: PRIMARY HERO CONTENT ─────────────────── */}
        <div className="hero__copy rev">

          <p className="hero__kicker">
            Technocrats · Information Technology · Onam 2026
          </p>

          <h1 className="hero__title">
            TECHAVAM<em>2026</em>
          </h1>

          <p className="hero__rule">
            Code <i>•</i> Culture <i>•</i> Celebrate
          </p>

          <p className="hero__sub">
            The IT Department's Onam celebration. One morning, four events, and Kerala's
            oldest festival run the way this department does things — startups, digital
            art, a treasure hunt across the block, and a coding quest that unlocks level
            by level.
          </p>

          <div className="hero__cta">
            <a
              className="btn btn--gold"
              href="#/register"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/register');
              }}
            >
              Click here to register <span className="btn__arrow">→</span>
            </a>
            <a
              className="btn btn--ghost"
              href="#events"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              See the four events
            </a>
          </div>

          <ul className="hero__meta">
            <li><MetaItem value={FEST.date} label="DATE" /></li>
            <li><MetaItem value={FEST.venue} label="VENUE" /></li>
            <li>Teams of up to <b>4</b></li>
          </ul>

        </div>

        {/* ── RIGHT: ONAM POOKALAM / RANGOLI VISUAL ─────────── */}
        <div className="hero__art hero__art--right rev">
          <OnamRangoli />
        </div>

      </div>
    </section>
  );
}
