// TECHAVAM 2026 — Configuration
// Edit ONLY this file to customise dates, links, venues and contact details.

export const FORM_LINKS = {
  startup:  'STARTUP_MAVELI_GOOGLE_FORM_URL',
  pookolam: 'DIGITAL_POOKOLAM_GOOGLE_FORM_URL',
  race:     'TECH_KERALA_AMAZING_RACE_GOOGLE_FORM_URL',
  code:     'CODE_QUESTERS_GOOGLE_FORM_URL',
};

export const FEST = {
  date:         null,   // e.g. 'Saturday, 12 September 2026'
  venue:        null,   // e.g. 'IT Block, Seminar Hall'
  contactName:  null,
  contactPhone: null,
  contactEmail: null,
  instagram:    null,
};

export const CLUB = {
  name: 'Technocrats',
  role: 'IT Department Student Club',
  intro: [
    '[ADD OFFICIAL CLUB INTRODUCTION HERE] Technocrats is a student-driven initiative of the Information Technology department, built around technology, innovation, creativity, collaboration and student development.',
    'TECHAVAM 2026 is our department-level Onam celebration — a day where students take on technology-driven, creative and culturally inspired challenges together.',
  ],
};

export const SCHEDULE = [
  { label: 'Slot 1', time: '8:45 – 10:45 AM',    events: 'Startup Maveli · Amazing Race',      kind: 'slot'  },
  { label: 'Break',  time: '10:45 – 11:15 AM',   events: 'Refreshments',                        kind: 'break' },
  { label: 'Slot 2', time: '11:30 AM – 1:30 PM', events: 'Digital Pookolam · Code Questers',   kind: 'slot'  },
];

export const EVENTS = [
  {
    id: 'startup',
    name: 'Startup Maveli',
    tagline: 'Modernising Onam through innovation',
    slot: 'Slot 1',
    time: '8:45 – 10:45 AM',
    teaser: 'Mahabali is back in 2026 and he wants Onam upgraded. Build the startup that does it.',
    description:
      'Mahabali has returned in 2026 and wants to modernise Onam. Your team builds a technology startup that solves a real Onam or Kerala problem — then pitches it like a founder. MaveliGPT, SadhyaAI, Pookalam-as-a-Service, Smart Vadamvali, an Onam event app, an AI Onam assistant: the idea is yours, the ambition is the point.',
    deliverables: [
      'Startup name and logo',
      'Problem statement and solution',
      'A website or app prototype',
      'Business model',
      'A short pitch to the panel',
    ],
    rules: [
      'Teams of 1 to 4 members.',
      'Bring your own laptop; the department provides power and Wi-Fi.',
      'The idea must connect to Onam, Kerala or the celebration itself.',
      'AI tools are allowed — say so in your pitch.',
      'Pitch time is capped; the panel stops you when it ends.',
    ],
    tags: ['Innovation', 'Entrepreneurship', 'AI', 'Prototype'],
    seal: { rings: [8, 12, 16], hue: 'gold' },
    formUrl: 'STARTUP_MAVELI_GOOGLE_FORM_URL',
  },
  {
    id: 'pookolam',
    name: 'Digital Pookolam',
    tagline: 'Where tradition meets digital creativity',
    slot: 'Slot 2',
    time: '11:30 AM – 1:30 PM',
    teaser: 'The same flowers, the same rings, none of the flowers. Draw the pookalam on a screen.',
    description:
      'A theme-based digital art competition built on the traditional Kerala pookalam. The theme is announced at the start of the slot — Technology Meets Tradition, Kerala 2050, Digital Mahabali, Green Onam, AI Meets Kerala, Onam in Space are the kind of prompts to expect.',
    deliverables: [
      'One digital pookalam on the announced theme',
      'Any hidden elements the organisers add mid-slot',
      'A one-line description of your concept',
    ],
    rules: [
      'Teams of 1 to 4 members.',
      'Any software you like — Figma, Illustrator, Procreate, Blender, code.',
      'The theme is revealed only when the slot begins.',
      'Work must be created during the slot. Pre-made art is disqualified.',
      'Submit as PNG or JPG at the size announced by the organisers.',
    ],
    tags: ['Digital Art', 'Design', 'Creativity', 'Onam'],
    seal: { rings: [6, 12, 18], hue: 'marigold' },
    formUrl: 'DIGITAL_POOKOLAM_GOOGLE_FORM_URL',
  },
  {
    id: 'race',
    name: 'Tech + Kerala Amazing Race',
    tagline: 'Solve · Scan · Run · Discover',
    slot: 'Slot 1',
    time: '8:45 – 10:45 AM',
    teaser: 'Seven checkpoints across the department. Code, culture, QR codes and your legs.',
    description:
      'A hybrid treasure hunt: part debugging, part Kerala trivia, part physical challenge. Teams move checkpoint to checkpoint, and each one only opens after you clear the last. The final checkpoint is Mahabali himself.',
    checkpoints: [
      { n: '01', label: 'Coding',   text: 'Fix a small bug to move on.' },
      { n: '02', label: 'Kerala',   text: 'Identify a traditional item, song, place or personality.' },
      { n: '03', label: 'QR',       text: 'Scan the code, solve the clue it hides.' },
      { n: '04', label: 'Physical', text: 'A short team challenge. No shortcuts.' },
      { n: '05', label: 'AI',       text: 'Prompt your way past an AI task.' },
      { n: '06', label: 'Logic',    text: 'A puzzle that does not care how fast you type.' },
      { n: '07', label: 'Mahabali', text: 'Find him. Recover the treasure. Finish.' },
    ],
    deliverables: [
      'Clear all checkpoints in order',
      'Collect the token issued at each checkpoint',
      'Reach the final checkpoint before the slot closes',
    ],
    rules: [
      'Teams of 1 to 4 members.',
      'Carry one charged phone with a working QR scanner.',
      'Checkpoints must be cleared in order — skipping voids the run.',
      'Wear something you can move in.',
      'Volunteer decisions at a checkpoint are final.',
    ],
    tags: ['Treasure Hunt', 'QR', 'Technology', 'Kerala', 'Teamwork'],
    seal: { rings: [10, 10, 20], hue: 'lavender' },
    formUrl: 'TECH_KERALA_AMAZING_RACE_GOOGLE_FORM_URL',
  },
  {
    id: 'code',
    name: 'Code Questers',
    tagline: 'Crack the code · Complete the quest',
    slot: 'Slot 2',
    time: '11:30 AM – 1:30 PM',
    teaser: 'Six locked levels. Clearing one is the only way to see the next.',
    description:
      'Not a conventional programming contest — a progressive quest. Every level is a different kind of thinking, and each one you clear unlocks the one after it. You will not see level six until level five falls.',
    levels: [
      { n: '01', label: 'Bug Hunt',          text: 'Find what is broken.' },
      { n: '02', label: 'Output Prediction', text: 'Read the code. Say what it prints.' },
      { n: '03', label: 'Logic Quest',       text: 'Reason it out before you type.' },
      { n: '04', label: 'Code Breaker',      text: 'Decode what is hidden.' },
      { n: '05', label: 'Speed Coding',      text: 'Correct, and fast.' },
      { n: '06', label: 'Final Code',        text: 'Everything above, at once.' },
    ],
    deliverables: [
      'Clear each level to unlock the next',
      'Working solutions, not pseudocode',
      'Finish as far as you can before the slot closes',
    ],
    rules: [
      'Teams of 1 to 4 members.',
      'Language of your choice unless a level says otherwise.',
      'Levels unlock in sequence — no jumping ahead.',
      'Ranking is by levels cleared, then by time.',
      'AI assistants are not allowed inside this event.',
    ],
    tags: ['Coding', 'Debugging', 'Logic', 'Problem Solving'],
    seal: { rings: [4, 16, 24], hue: 'violet' },
    formUrl: 'CODE_QUESTERS_GOOGLE_FORM_URL',
  },
];

export function isFormLinkReady(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url.trim());
}
