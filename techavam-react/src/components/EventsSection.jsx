import { useEffect, useRef } from 'react';
import { EVENTS } from '../config.js';
import { seal } from '../pookalam.js';

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-in');
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
}

function EventCard({ event, onRegister }) {
  const ref = useRef(null);
  useReveal(ref);
  const sealHtml = seal({
    counts: event.seal.rings,
    hue: event.seal.hue,
    label: `${event.name} emblem`,
  });

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
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      <div className="card__foot">
        <span className="card__time">{event.time}</span>
        <a
          className="btn btn--ghost"
          href={`#/register/${event.id}`}
          onClick={(e) => {
            e.preventDefault();
            onRegister(event.id);
          }}
        >
          REGISTER NOW <span className="btn__arrow">→</span>
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
            <p className="eyebrow">The Four Events</p>
            <h2 className="sect__title">Four ways to spend the morning.</h2>
          </div>

          {/* Catchy & Styled Highlighted Callout Box */}
          <div className="events__callout">
            <div className="events__callout-top">
              <span className="events__pill">
                <span className="events__pill-dot" />
                Slot 1 &amp; Slot 2
              </span>
              <span className="events__pill-tag">⚡ 4 Arenas · 1 Morning</span>
            </div>
            <p className="events__callout-main">
              <strong>Two showdowns before the break, two high-voltage battles after.</strong>
            </p>
            <p className="events__callout-sub">
              Every event is its own arena with a dedicated registration form — pick your battlefield, rally your squad, and claim the Onam championship!
            </p>
          </div>
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
