import { useEffect, useRef } from 'react';
import { EVENTS } from '../config.js';
import { seal } from '../pookalam.js';

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

function EventCard({ event, onRegister }) {
  const ref = useRef(null);
  useReveal(ref);
  const sealHtml = seal({ counts: event.seal.rings, hue: event.seal.hue, label: `${event.name} emblem` });

  return (
    <article className="card rev" ref={ref}>
      <div className="card__top">
        <span className="card__slot">
          {event.slot} · {event.time.split('–')[0].trim()}
        </span>
        <span
          className="card__seal"
          dangerouslySetInnerHTML={{ __html: sealHtml }}
        />
      </div>
      <h3 className="card__name">{event.name}</h3>
      <p className="card__tagline">{event.tagline}</p>
      <p className="card__text">{event.teaser}</p>
      <div className="card__tags">
        {event.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
      <div className="card__foot">
        <span className="card__time">{event.time}</span>
        <a
          className="btn btn--ghost"
          href={`#/register/${event.id}`}
          onClick={(e) => { e.preventDefault(); onRegister(event.id); }}
        >
          Click here to register <span className="btn__arrow">→</span>
        </a>
      </div>
    </article>
  );
}

export default function EventsSection({ onNavigate }) {
  const headRef = useRef(null);
  useReveal(headRef);

  const handleRegister = (id) => onNavigate(`/register/${id}`);

  return (
    <section className="sect" id="events">
      <div className="wrap">
        <div className="events__head rev" ref={headRef}>
          <div>
            <p className="eyebrow">The four events</p>
            <h2 className="sect__title">Four ways to spend the morning.</h2>
          </div>
          <p className="sect__lead">
            Two run before the break, two after. Every event has its own registration
            form — pick the one you want and take your team in.
          </p>
        </div>

        <div className="events__grid">
          {EVENTS.map((ev) => (
            <EventCard key={ev.id} event={ev} onRegister={handleRegister} />
          ))}
        </div>
      </div>
    </section>
  );
}
