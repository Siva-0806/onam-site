// TECHAVAM 2026 — Centralized Event & Registration Configuration
// Event Google Form Responder URLs (Public)

export const FORM_LINKS = {
  startup:
    'https://docs.google.com/forms/d/e/1FAIpQLSeUfZU6-znHvfK6MuZMve3jfsEjebHqxxqg41jzUXKTxaTc0g/viewform?usp=sharing&ouid=101931112181900490676',
  pookolam:
    'https://docs.google.com/forms/d/e/1FAIpQLSc3KCHkyLhfGrIsoehLBKVtHjPEL2MseuGtxqX_TDVXifI0dg/viewform?usp=sharing&ouid=101931112181900490676',
  race:
    'https://docs.google.com/forms/d/e/1FAIpQLSfQcdfkQIe1yu0pm_mKE85KImLpx_lsBD1uk0RoEaKNHWtJlw/viewform?usp=sharing&ouid=101931112181900490676',
  code:
    'https://docs.google.com/forms/d/e/1FAIpQLSdLj_X9WyI0KnGNioEBnaScsQJf_jr3_2QWe5kmDbhRgjIfvg/viewform?usp=sharing&ouid=101931112181900490676',
};

export const FEST = {
  date: 'September 2026',
  venue: 'IT Department Block',
  contactName: 'Technocrats Coordinator',
  contactPhone: null,
  contactEmail: null,
  instagram: null,
};

export const CLUB = {
  name: 'Technocrats',
  role: 'IT Department Student Club',
  intro: [
    'Technocrats is a student-driven initiative of the Information Technology department, built around technology, innovation, creativity, collaboration, and student excellence.',
    'TECHAVAM 2026 is our department-level Onam celebration — a morning where 2nd and 3rd year IT students take on technology-driven, creative, and culturally inspired challenges together.',
  ],
};

export const SCHEDULE = [
  {
    label: 'Slot 1',
    time: '8:45 – 10:45 AM',
    events: 'Startup Maveli · Amazing Race',
    kind: 'slot',
  },
  {
    label: 'Break',
    time: '10:45 – 11:15 AM',
    events: 'Refreshments & Cultural Gather',
    kind: 'break',
  },
  {
    label: 'Slot 2',
    time: '11:30 AM – 1:30 PM',
    events: 'Digital Pookolam · Code Questers',
    kind: 'slot',
  },
];

export const EVENTS = [
  {
    id: 'startup',
    name: 'Startup Maveli',
    tagline: 'Modernising Onam through innovation',
    slot: 'Slot 1',
    time: '8:45 – 10:45 AM',
    teaser:
      'Mahabali is back in 2026 and he wants Onam upgraded. Build the startup prototype that does it.',
    description:
      'Mahabali has returned in 2026 and wants to modernise Onam. Build a technology startup idea that solves a real Onam or Kerala problem — then pitch it like a founder. MaveliGPT, SadhyaAI, Pookalam-as-a-Service, Smart Vadamvali, or an AI Onam assistant: the idea is yours, the ambition is the point.',
    deliverables: [
      'Startup name and concept',
      'Problem statement and technology solution',
      'A website, app, or UI prototype',
      'Business model & value proposition',
      'A short pitch presentation to the panel',
    ],
    rules: [
      'Open exclusively to 2nd & 3rd Year IT students.',
      'Individual registration per participant.',
      'Bring your own laptop; power and Wi-Fi are provided.',
      'The idea must connect to Onam, Kerala, or culture & technology.',
      'AI tools and frameworks are allowed — cite them in your pitch.',
      'Pitch presentation time is strictly capped.',
    ],
    tags: ['Innovation', 'Entrepreneurship', 'AI', 'Prototype'],
    seal: { rings: [8, 12, 16], hue: 'gold' },
    formUrl: FORM_LINKS.startup,
  },
  {
    id: 'pookolam',
    name: 'Digital Pookolam',
    tagline: 'Where tradition meets digital creativity',
    slot: 'Slot 2',
    time: '11:30 AM – 1:30 PM',
    teaser:
      'The same floral rings, none of the physical petals. Design the festive pookalam on a digital canvas.',
    description:
      'A theme-based digital art competition built on the traditional Kerala pookalam. The theme is announced at the start of the slot — Technology Meets Tradition, Kerala 2050, Digital Mahabali, Green Onam, or AI Meets Culture are the kind of prompts to expect.',
    deliverables: [
      'One high-resolution digital pookalam on the announced theme',
      'Any hidden design elements specified at the slot kickoff',
      'A concise one-line description of your creative concept',
    ],
    rules: [
      'Open exclusively to 2nd & 3rd Year IT students.',
      'Individual registration per participant.',
      'Any digital tool allowed — Figma, Illustrator, Photoshop, Procreate, Blender, or code/SVG/Canvas.',
      'The specific prompt is revealed when the slot begins.',
      'All artwork must be created live during the slot. Pre-made templates are disqualified.',
      'Submit as PNG, JPG, or SVG at the specified resolution.',
    ],
    tags: ['Digital Art', 'Design', 'Creativity', 'Onam'],
    seal: { rings: [6, 12, 18], hue: 'marigold' },
    formUrl: FORM_LINKS.pookolam,
  },
  {
    id: 'race',
    name: 'Tech + Kerala Amazing Race',
    tagline: 'Solve · Scan · Run · Discover',
    slot: 'Slot 1',
    time: '8:45 – 10:45 AM',
    teaser:
      'Seven checkpoints across the department block. Code, culture, QR codes, and quick thinking.',
    description:
      'A hybrid treasure hunt: part debugging, part Kerala cultural trivia, and part physical challenge. Move checkpoint to checkpoint across the department block — each one unlocks only after you solve and clear the previous one.',
    checkpoints: [
      { n: '01', label: 'Coding', text: 'Fix a small bug to unlock your next clue.' },
      { n: '02', label: 'Kerala', text: 'Identify a traditional Kerala item, song, or landmark.' },
      { n: '03', label: 'QR Clue', text: 'Scan the hidden QR code and solve its riddle.' },
      { n: '04', label: 'Physical', text: 'A short physical team task. No shortcuts.' },
      { n: '05', label: 'AI Task', text: 'Prompt and debug an AI puzzle challenge.' },
      { n: '06', label: 'Logic', text: 'A logic puzzle that tests reasoning over speed.' },
      { n: '07', label: 'Mahabali', text: 'Find Mahabali, recover the final token, and finish.' },
    ],
    deliverables: [
      'Clear all seven checkpoints in sequential order',
      'Collect the verification token issued at each checkpoint',
      'Reach the finish line before the slot closes',
    ],
    rules: [
      'Open exclusively to 2nd & 3rd Year IT students.',
      'Individual registration per participant.',
      'Carry one charged smartphone with an active camera/QR scanner.',
      'Checkpoints must be cleared in order — skipping voids the run.',
      'Wear comfortable attire for movement.',
      'Volunteer and checkpoint judge decisions are final.',
    ],
    tags: ['Treasure Hunt', 'QR', 'Technology', 'Kerala', 'Logic'],
    seal: { rings: [10, 10, 20], hue: 'lavender' },
    formUrl: FORM_LINKS.race,
  },
  {
    id: 'code',
    name: 'Code Questers',
    tagline: 'Crack the code · Complete the quest',
    slot: 'Slot 2',
    time: '11:30 AM – 1:30 PM',
    teaser:
      'Six progressive locked levels. Solving one is the only way to unlock the next.',
    description:
      'Not a conventional coding contest — a progressive quest. Every level tests a distinct facet of problem-solving, algorithmic thinking, and debugging. Level six remains locked until level five falls.',
    levels: [
      { n: '01', label: 'Bug Hunt', text: 'Identify and fix logic errors in broken code.' },
      { n: '02', label: 'Output Prediction', text: 'Analyze tricky snippets and determine exact output.' },
      { n: '03', label: 'Logic Quest', text: 'Derive algorithmic solutions before coding.' },
      { n: '04', label: 'Code Breaker', text: 'Decode hidden patterns and ciphers.' },
      { n: '05', label: 'Speed Coding', text: 'Write optimal, clean solutions against the clock.' },
      { n: '06', label: 'Final Quest', text: 'The ultimate synthesis challenge.' },
    ],
    deliverables: [
      'Clear each quest level to unlock subsequent challenges',
      'Submit working code solutions with correct test cases',
      'Finish as many levels as possible before the slot timer expires',
    ],
    rules: [
      'Open exclusively to 2nd & 3rd Year IT students.',
      'Individual registration per participant.',
      'Programming languages: Python, C++, Java, C, or JavaScript.',
      'Levels unlock strictly in sequence.',
      'Ranking is evaluated by total levels cleared, then by total completion time.',
      'External AI coding assistants are prohibited during this contest.',
    ],
    tags: ['Coding', 'Debugging', 'Algorithms', 'Logic'],
    seal: { rings: [4, 16, 24], hue: 'violet' },
    formUrl: FORM_LINKS.code,
  },
];

export function isFormLinkReady(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url.trim());
}
