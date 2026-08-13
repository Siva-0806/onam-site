import { useState, useEffect, useRef } from 'react';
import { EVENTS, SCHEDULE, FEST, isFormLinkReady } from '../config.js';
import { seal } from '../pookalam.js';

function Todo({ label }) {
  return <span className="todo">ADD {label}</span>;
}

function ScheduleRow({ row }) {
  return (
    <div className={`sched__row${row.kind === 'break' ? ' sched__row--break' : ''}`}>
      <p className="sched__label">{row.label}</p>
      <div>
        <p className="sched__time">{row.time}</p>
        <p className="sched__what">{row.events}</p>
      </div>
    </div>
  );
}

function Sequence({ items, title }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="block">
      <p className="block__h">{title} · cleared in order</p>
      <ul className="steps">
        {items.map((s) => (
          <li key={s.n}>
            <b>{s.n}</b>
            <i>{s.label}</i>
            <span>{s.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventPanel({ event }) {
  const ready = isFormLinkReady(event.formUrl);
  const sequence = event.checkpoints || event.levels;
  const seqTitle = event.checkpoints ? 'Checkpoints' : 'Levels';

  return (
    <>
      {/* Main content */}
      <div className="panel__main">
        <h2 className="panel__name">{event.name}</h2>
        <p className="panel__tagline">{event.tagline}</p>
        <p className="panel__text">{event.description}</p>

        <div className="facts">
          <div className="fact"><span>Slot</span><b>{event.slot}</b></div>
          <div className="fact"><span>Timing</span><b>{event.time}</b></div>
          <div className="fact"><span>Team size</span><b>1 – 4 members</b></div>
          <div className="fact"><span>Eligibility</span><b>IT · 2nd &amp; 3rd year</b></div>
        </div>

        <Sequence items={sequence} title={seqTitle} />

        <div className="block">
          <p className="block__h">What your team submits</p>
          <ul className="list">
            {event.deliverables.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>

        <div className="block">
          <p className="block__h">Rules</p>
          <ul className="list">
            {event.rules.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="rail">
        <div className="qr">
          <p className="qr__h">Register for {event.name}</p>
          {ready ? (
            <>
              <div className="qr__box qr__box--empty" style={{ fontSize: '11px', lineHeight: 1.6 }}>
                QR code displayed when Google Form link is active.
              </div>
              <p className="qr__cap">Scan or click to open the {event.name} form</p>
            </>
          ) : (
            <div className="qr__box qr__box--empty">
              QR appears once this event's Google Form link is added to FORM_LINKS in config.js → {event.id}
            </div>
          )}
          <div className="qr__cta">
            {ready ? (
              <a
                className="btn btn--gold"
                href={event.formUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Google Form <span className="btn__arrow">→</span>
              </a>
            ) : (
              <span className="btn btn--gold" aria-disabled="true">
                Form link not added yet
              </span>
            )}
          </div>
          {!ready && (
            <p className="notice">
              Search config.js for FORM_LINKS and replace <b>{event.formUrl}</b> with this event's Google Form link. The button and QR both read from that one value.
            </p>
          )}
        </div>
      </aside>
    </>
  );
}

export default function RegisterPage({ initialEvent, onBack }) {
  const [selectedId, setSelectedId] = useState(initialEvent || EVENTS[0].id);
  const selectedEvent = EVENTS.find((e) => e.id === selectedId) || EVENTS[0];

  // Sync URL hash
  useEffect(() => {
    if (window.history.replaceState) {
      window.history.replaceState({}, '', `#/register/${selectedId}`);
    }
  }, [selectedId]);

  return (
    <>
      {/* Hero */}
      <section className="rhero">
        <div className="wrap">
          <button className="back" onClick={onBack}>
            <span>←</span> Back to home
          </button>
          <h1 className="rhero__title">Register for TECHAVAM 2026</h1>
          <p className="rhero__sub">
            Choose your event, read what it actually involves, then open its form. Each
            event has its own form — scanning the wrong one puts your team in the wrong event.
          </p>
          <ul className="hero__meta" style={{ marginTop: '26px' }}>
            <li><b>{FEST.date || <Todo label="DATE" />}</b></li>
            <li><b>{FEST.venue || <Todo label="VENUE" />}</b></li>
            <li>Registration closes at the start of each slot</li>
          </ul>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(70px,10vw,120px)' }}>
        <div className="wrap">
          {/* Event picker */}
          <div className="picker" role="tablist" aria-label="Choose an event">
            {EVENTS.map((ev) => {
              const sealHtml = seal({ counts: ev.seal.rings, hue: ev.seal.hue, label: '' });
              return (
                <button
                  key={ev.id}
                  className="pick"
                  type="button"
                  role="tab"
                  aria-selected={selectedId === ev.id}
                  tabIndex={selectedId === ev.id ? 0 : -1}
                  onClick={() => setSelectedId(ev.id)}
                  onKeyDown={(e) => {
                    const ids = EVENTS.map((ev) => ev.id);
                    const i = ids.indexOf(selectedId);
                    if (e.key === 'ArrowRight') {
                      const next = ids[(i + 1) % ids.length];
                      setSelectedId(next);
                    } else if (e.key === 'ArrowLeft') {
                      const prev = ids[(i + ids.length - 1) % ids.length];
                      setSelectedId(prev);
                    }
                  }}
                >
                  <span
                    className="pick__seal"
                    dangerouslySetInnerHTML={{ __html: sealHtml }}
                  />
                  <span>
                    <span className="pick__name">{ev.name}</span>
                    <br />
                    <span className="pick__slot">{ev.slot}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Event panel */}
          <div className="panel" role="tabpanel" tabIndex={-1}>
            <EventPanel event={selectedEvent} />
          </div>

          {/* Schedule */}
          <div className="sched" style={{ marginTop: '56px' }}>
            <p className="eyebrow">Timing on the day</p>
            {SCHEDULE.map((s, i) => (
              <ScheduleRow key={i} row={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
