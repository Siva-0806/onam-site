import { useEffect, useRef } from 'react';

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

export default function ClosingCTA({ onNavigate }) {
  const ref = useRef(null);
  useReveal(ref);

  return (
    <section className="sect close">
      <div className="wrap rev" ref={ref}>
        <p className="eyebrow" style={{ justifyContent: 'center' }}>
          Registrations open
        </p>
        <h2 className="sect__title close__title">
          Sadhya later.<br />Register now.
        </h2>
        <p className="close__sub">
          Choose an event, read its rules, and open the form. Two minutes with your
          team's roll numbers is all it takes.
        </p>
        <a
          className="btn btn--gold"
          href="#/register"
          onClick={(e) => { e.preventDefault(); onNavigate('/register'); }}
        >
          Click here to register <span className="btn__arrow">→</span>
        </a>
      </div>
    </section>
  );
}
