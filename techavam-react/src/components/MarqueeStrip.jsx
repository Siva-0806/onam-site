// Marquee strip that scrolls the event themes
const THEMES = [
  'Technology', 'Kerala culture', 'Creativity', 'Teamwork',
  'Problem solving', 'Entrepreneurship', 'Digital art',
];

export default function MarqueeStrip() {
  // Double the list so the scroll loop is seamless
  const items = [...THEMES, ...THEMES];

  return (
    <div className="strip" aria-hidden="true">
      <div className="strip__track">
        {items.map((t, i) => (
          <span key={i}>
            {t} <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}
