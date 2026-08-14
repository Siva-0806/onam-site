import { useEffect, useRef } from 'react';
import { SCHEDULE } from '../config.js';

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

function RuleCard({ rule }) {
  const ref = useRef(null);
  useReveal(ref);
  return (
    <article className="rule rev" ref={ref}>
      <p className="rule__n">{rule.n}</p>
      <h3 className="rule__t">{rule.title}</h3>
      <p className="rule__d">{rule.desc}</p>
    </article>
  );
}

// Eligibility removed; replaced with an event-spirit card
const RULES = [
  {
    n: 'Event Spirit',
    title: 'One morning, four challenges',
    desc: 'TECHAVAM packs an Onam hackathon, digital pookkalam design, a 90-minute AI website blitz, and an IPL mega player auction all into one celebration morning. Pick your challenge, build your team.',
  },
  {
    n: 'Teams',
    title: 'Four members, maximum',
    desc: 'Enter alone or with up to three others. Members 2, 3 and 4 are optional on every form — a team of one is a valid team.',
  },
  {
    n: 'Registration',
    title: 'One form per event',
    desc: 'Each event has its own Google Form and its own QR code. Both Slot 1 events run at the same time, and so do both Slot 2 events — so pick one from each slot at most.',
  },
];

export default function ParticipationSection() {
  const headerRef = useRef(null);
  useReveal(headerRef);

  return (
    <section className="sect sect--cream" id="participate">
      <div className="wrap">
        <div className="rev" ref={headerRef}>
          <p className="eyebrow">How it works</p>
          <h2 className="sect__title">
            Four events. One morning. Your call.
          </h2>
          <p className="sect__lead">
            TECHAVAM is an internal department celebration, so entry is limited to IT
            students. Read the ground rules before you fill a form — it saves a rejected
            registration later.
          </p>
        </div>

        {/* Rules grid */}
        <div className="rules">
          {RULES.map((r) => (
            <RuleCard key={r.n} rule={r} />
          ))}
        </div>

        {/* Schedule */}
        <div className="sched" id="schedule">
          <p className="eyebrow" style={{ marginTop: '56px' }}>Schedule</p>
          {SCHEDULE.map((s, i) => (
            <ScheduleRow key={i} row={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
