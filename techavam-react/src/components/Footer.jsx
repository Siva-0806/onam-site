import { FEST } from '../config.js';

function Todo({ label }) {
  return <span className="todo">ADD {label}</span>;
}

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <div>
          <p className="brand__name">TECHAVAM 2026</p>
          <p className="foot__note">Technocrats · Department of Information Technology</p>
        </div>
        <div className="foot__note">
          Coordinator: <b>{FEST.contactName || <Todo label="NAME" />}</b><br />
          Phone: <b>{FEST.contactPhone || <Todo label="PHONE" />}</b><br />
          Mail: <b>{FEST.contactEmail || <Todo label="EMAIL" />}</b>
        </div>
      </div>
    </footer>
  );
}
