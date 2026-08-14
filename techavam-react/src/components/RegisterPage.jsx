import { useState, useEffect } from 'react';
import { EVENTS, SCHEDULE, FEST } from '../config.js';
import { seal } from '../pookalam.js';
import EventQRCode from './EventQRCode.jsx';

function MetaItem({ value, label }) {
  if (value) return <b>{value}</b>;
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
      <p className="block__h">{title}</p>
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
  const sequence =
    event.sprintTimeline ||
    event.auctionRounds ||
    event.checkpoints ||
    event.levels;
  const seqTitle = event.sprintTimeline
    ? 'Sprint Timeline'
    : event.auctionRounds
    ? 'Auction Rounds'
    : event.checkpoints
    ? 'Checkpoints · Cleared in order'
    : 'Levels · Cleared in order';

  return (
    <>
      {/* Main content */}
      <div className="panel__main">
        <h2 className="panel__name">{event.name}</h2>
        <p className="panel__tagline">{event.tagline}</p>
        <p className="panel__text">{event.description}</p>

        <div className="facts">
          <div className="fact">
            <span>Slot</span>
            <b>{event.slot}</b>
          </div>
          <div className="fact">
            <span>Timing</span>
            <b>{event.time}</b>
          </div>
          <div className="fact">
            <span>Registration</span>
            <b>Individual Entry</b>
          </div>
          <div className="fact">
            <span>Eligibility</span>
            <b>IT · 2nd &amp; 3rd Year</b>
          </div>
        </div>

        <Sequence items={sequence} title={seqTitle} />

        <div className="block">
          <p className="block__h">What you submit</p>
          <ul className="list">
            {event.deliverables.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="block">
          <p className="block__h">Rules &amp; Guidelines</p>
          <ul className="list">
            {event.rules.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Registration Sidebar with Scannable QR & Register Now Button */}
      <aside className="rail">
        <div className="qr-container">
          <div className="qr-container__header">
            <span className="qr-container__badge">{event.slot}</span>
            <h3 className="qr-container__title">{event.name}</h3>
            <p className="qr-container__instruction">
              Scan the QR code or click <strong>Register Now</strong> to submit your registration.
            </p>
          </div>

          {/* QR Code */}
          <div className="qr-container__code">
            <EventQRCode url={event.formUrl} eventName={event.name} size={180} />
          </div>

          <div className="qr-container__divider">
            <span>OR</span>
          </div>

          {/* Direct Button */}
          <div className="qr-container__action">
            <a
              className="btn btn--gold btn--full"
              href={event.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open registration form for ${event.name} in new tab`}
            >
              REGISTER NOW <span className="btn__arrow">→</span>
            </a>
            <p className="qr-container__hint">
              Opens the official Google Form in a new tab. Individual registration.
            </p>
          </div>
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
            Each event has its own dedicated Google Form. Select your challenge below, scan the QR code, or click <strong>Register Now</strong> to participate.
          </p>
          <ul className="hero__meta" style={{ marginTop: '26px' }}>
            <li>
              <MetaItem value={FEST.date} label="DATE" />
            </li>
            <li>
              <MetaItem value={FEST.venue} label="VENUE" />
            </li>
            <li>2nd &amp; 3rd Year IT Students Only</li>
          </ul>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(70px,10vw,120px)' }}>
        <div className="wrap">
          {/* Event picker tabs */}
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
                    const ids = EVENTS.map((item) => item.id);
                    const i = ids.indexOf(selectedId);
                    if (e.key === 'ArrowRight') {
                      setSelectedId(ids[(i + 1) % ids.length]);
                    } else if (e.key === 'ArrowLeft') {
                      setSelectedId(ids[(i + ids.length - 1) % ids.length]);
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
            <p className="eyebrow">Event Timing on the Day</p>
            {SCHEDULE.map((s, i) => (
              <ScheduleRow key={i} row={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
