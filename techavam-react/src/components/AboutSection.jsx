import { useEffect, useRef } from 'react';
import { CLUB } from '../config.js';

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-in'); io.unobserve(el); } },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
}

function IntroBody() {
  return (
    <div className="about__body">
      {CLUB.intro.map((para, i) => {
        // Replace [ADD ...] patterns with .todo chips
        const parts = para.split(/(\[[^\]]+\])/g);
        return (
          <p key={i}>
            {parts.map((part, j) =>
              part.startsWith('[') && part.endsWith(']')
                ? <span key={j} className="todo">{part.slice(1, -1)}</span>
                : part
            )}
          </p>
        );
      })}
    </div>
  );
}

export default function AboutSection() {
  const leftRef  = useRef(null);
  const rightRef = useRef(null);
  useReveal(leftRef);
  useReveal(rightRef);

  return (
    <section className="sect sect--cream" id="about">
      <div className="wrap">
        <div className="about__grid">
          {/* Left column */}
          <div className="rev" ref={leftRef}>
            <p className="eyebrow">About the club</p>
            <h2 className="sect__title">
              A student club, a department, and one very old festival.
            </h2>
            <IntroBody />
          </div>

          {/* Right column: plaque */}
          <aside className="plaque rev" ref={rightRef}>
            <div className="plaque__logo">ADD CLUB<br />LOGO HERE</div>
            <h3 className="plaque__name">Technocrats</h3>
            <p className="plaque__role">IT Department Student Club</p>
            <ul className="plaque__list">
              <li><span>Department</span><b>Information Technology</b></li>
              <li><span>Occasion</span><b>Onam 2026</b></li>
              <li><span>Open to</span><b>2nd &amp; 3rd year</b></li>
              <li><span>Team size</span><b>Up to 4</b></li>
              <li><span>Events</span><b>Four</b></li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
