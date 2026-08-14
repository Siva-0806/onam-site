import { FEST } from '../config.js';

export default function Footer() {
  const coordinators = FEST.coordinators || [
    { name: 'SIVAPIRIYAN', phone: '9345814759' },
    { name: 'RITHIKA SRI', phone: '99422 44472' },
    { name: 'MADHU CHANDHANA', phone: '93426 04040' },
    { name: 'GAUTHAMAN', phone: '63832 37563' },
  ];

  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <div className="foot__brand-col">
          <p className="brand__name">TECHAVAM 2026</p>
          <p className="foot__dept">Technocrats · Department of Information Technology</p>
          <p className="foot__sub">Code • Culture • Celebrate</p>
        </div>

        <div className="foot__contact-col">
          <p className="foot__heading">Event Coordinators</p>
          <div className="foot__coords-grid">
            {coordinators.map((c, i) => (
              <div key={i} className="foot__coord">
                <span className="foot__coord-name">{c.name}</span>
                <a
                  className="foot__coord-phone"
                  href={`tel:${c.phone.replace(/\s+/g, '')}`}
                >
                  PH NO: <b>{c.phone}</b>
                </a>
              </div>
            ))}
          </div>

          <div className="foot__mail-row">
            <span>Mail:</span>{' '}
            <a className="foot__mail-link" href={`mailto:${FEST.contactEmail}`}>
              <b>{FEST.contactEmail}</b>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
