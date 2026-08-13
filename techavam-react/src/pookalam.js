// Pookalam SVG generator – pure JS, no dependencies

const HUES = {
  gold:     ['#E8B44F', '#F08A3C', '#C7ADF0', '#7C3FE4'],
  marigold: ['#F08A3C', '#E8B44F', '#C7ADF0', '#7C3FE4'],
  lavender: ['#C7ADF0', '#7C3FE4', '#E8B44F', '#F08A3C'],
  violet:   ['#7C3FE4', '#C7ADF0', '#E8B44F', '#F08A3C'],
};

function petalPath(r0, r1, w) {
  const mid = -(r0 + r1) / 2;
  return `M0,${-r0} Q${w},${mid} 0,${-r1} Q${-w},${mid} 0,${-r0}Z`;
}

function ring(count, r0, r1, w, attrs, spin, reverse) {
  let petals = '';
  for (let i = 0; i < count; i++) {
    petals += `<path d="${petalPath(r0, r1, w)}" transform="rotate(${(360 / count) * i})" ${attrs}/>`;
  }
  return `<g class="ring${reverse ? ' ring--rev' : ''}" style="transform-origin:0 0;--dur:${spin}s">${petals}</g>`;
}

function circuitRing(count, r, len) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const a = (360 / count) * i;
    out += `<g transform="rotate(${a})">` +
      `<line x1="0" y1="${-r}" x2="0" y2="${-(r + len)}" stroke="#E8B44F" stroke-width="1.1" opacity=".55"/>` +
      `<rect x="-2.4" y="${-(r + len + 4.8)}" width="4.8" height="4.8" fill="#E8B44F" opacity=".8"/></g>`;
  }
  return `<g class="ring ring--rev" style="transform-origin:0 0;--dur:170s">${out}</g>`;
}

export function pookalam(o = {}) {
  const counts  = o.counts  || [8, 14, 20];
  const pal     = HUES[o.hue] || HUES.gold;
  const circuit = o.circuit !== false;
  const label   = o.label   || 'Pookalam emblem';

  let s = '';

  if (circuit) {
    s += `<circle r="192" fill="none" stroke="#E8B44F" stroke-width="1" opacity=".28"/>`;
    s += `<circle r="186" fill="none" stroke="#E8B44F" stroke-width="1" opacity=".14"/>`;
    s += circuitRing(Math.max(24, counts[counts.length - 1] * 2), 168, 10);
  }

  const bands = o.bands || [
    { r0: 26,  r1: 76,  w: 17 },
    { r0: 68,  r1: 124, w: 15 },
    { r0: 118, r1: 170, w: 11 },
  ];
  const n = counts.length;
  for (let i = n - 1; i >= 0; i--) {
    const b = bands[bands.length - n + i] || bands[i];
    const c = pal[i % pal.length];
    const solid = o.solid === true || i % 2 === 0;
    const attrs = solid
      ? `fill="${c}" opacity="${i % 2 === 0 ? '.92' : '.7'}"`
      : `fill="${c}" opacity=".2" stroke="${c}" stroke-width="1.4"`;
    s += ring(counts[i], b.r0, b.r1, b.w, attrs, 120 - i * 26, i % 2 === 1);
  }

  s += `<circle r="26" fill="${pal[0]}" opacity=".16"/>`;
  s += `<circle r="26" fill="none" stroke="${pal[0]}" stroke-width="1.2" opacity=".7"/>`;
  s += `<circle r="12" fill="${pal[0]}"/>`;
  s += `<circle r="5"  fill="#180B2C"/>`;

  return `<svg viewBox="0 0 400 400" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg" focusable="false"><g transform="translate(200,200)">${s}</g></svg>`;
}

export function seal(o = {}) {
  return pookalam({
    counts: (o.counts || [8, 14]).slice(0, 2),
    hue: o.hue,
    circuit: o.circuit === true,
    solid: true,
    bands: [
      { r0: 30,  r1: 112, w: 36 },
      { r0: 104, r1: 182, w: 26 },
    ],
    label: o.label || 'Event emblem',
  });
}
