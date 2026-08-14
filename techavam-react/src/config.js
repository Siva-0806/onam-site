// TECHAVAM 2026 — Centralized Event & Registration Configuration
// Event Google Form Responder URLs (Public)

export const FORM_LINKS = {
  hackathon:
    'https://docs.google.com/forms/d/e/1FAIpQLSeUfZU6-znHvfK6MuZMve3jfsEjebHqxxqg41jzUXKTxaTc0g/viewform?usp=sharing&ouid=101931112181900490676',
  pookolam:
    'https://docs.google.com/forms/d/e/1FAIpQLSc3KCHkyLhfGrIsoehLBKVtHjPEL2MseuGtxqX_TDVXifI0dg/viewform?usp=sharing&ouid=101931112181900490676',
  webcraft:
    'https://docs.google.com/forms/d/e/1FAIpQLSdLj_X9WyI0KnGNioEBnaScsQJf_jr3_2QWe5kmDbhRgjIfvg/viewform?usp=sharing&ouid=101931112181900490676',
  cricbid:
    'https://docs.google.com/forms/d/e/1FAIpQLSfQcdfkQIe1yu0pm_mKE85KImLpx_lsBD1uk0RoEaKNHWtJlw/viewform?usp=sharing&ouid=101931112181900490676',
  // Backward compatibility keys
  startup:
    'https://docs.google.com/forms/d/e/1FAIpQLSeUfZU6-znHvfK6MuZMve3jfsEjebHqxxqg41jzUXKTxaTc0g/viewform?usp=sharing&ouid=101931112181900490676',
  code:
    'https://docs.google.com/forms/d/e/1FAIpQLSdLj_X9WyI0KnGNioEBnaScsQJf_jr3_2QWe5kmDbhRgjIfvg/viewform?usp=sharing&ouid=101931112181900490676',
  race:
    'https://docs.google.com/forms/d/e/1FAIpQLSfQcdfkQIe1yu0pm_mKE85KImLpx_lsBD1uk0RoEaKNHWtJlw/viewform?usp=sharing&ouid=101931112181900490676',
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
    events: 'HackKerala (Onam Hackathon) · Digital Pookolam',
    kind: 'slot',
  },
  {
    label: 'Break',
    time: '10:45 – 11:15 AM',
    events: 'Refreshments & Special Surprise Package Performance 🎭✨',
    kind: 'break',
  },
  {
    label: 'Slot 2',
    time: '11:30 AM – 1:30 PM',
    events: 'WebCraft AI (90-Min Blitz) · CricBid (IPL Mega Auction)',
    kind: 'slot',
  },
];

export const EVENTS = [
  {
    id: 'hackathon',
    name: 'HackKerala: The Onam Hackathon',
    tagline: "Code for God's Own Country · Problem Statements Dropping Live",
    slot: 'Slot 1',
    time: '8:45 – 10:45 AM',
    teaser:
      'A high-intensity 2-hour technical hackathon tackling real Kerala & Onam challenges. Problem statements revealed live at 8:45 AM!',
    description:
      'An adrenaline-pumping 2-hour technical hackathon celebrating innovation in the spirit of Onam. Participants will engineer solutions for real-world challenges inspired by Kerala culture, smart tourism, sustainable festivities, local commerce, and Malayalam digital tools. Secret problem statements will be officially delivered live at the 8:45 AM kickoff. Assemble your team, code your prototype, and pitch before the timer strikes!',
    deliverables: [
      'Working code prototype / demo application',
      'Problem statement selection & approach architecture',
      'Live technical demonstration to the jury',
      '2-minute lightning pitch & Q&A session',
    ],
    rules: [
      'Open exclusively to 2nd & 3rd Year IT students.',
      'Individual or team entry (up to 4 members).',
      'Secret problem statements will be announced live at 8:45 AM sharp.',
      'All prototypes and code must be developed live during the 2-hour window.',
      'Any tech stack, framework, or programming language is permitted.',
      'AI coding tools and frameworks are allowed with disclosure in the pitch.',
      'Final prototype submission and code freeze at 10:45 AM.',
    ],
    tags: ['Hackathon', 'Kerala Tech', 'Coding', 'Innovation', 'Prototype'],
    seal: { rings: [8, 12, 16], hue: 'gold' },
    formUrl: FORM_LINKS.hackathon,
  },
  {
    id: 'pookolam',
    name: 'Digital Pookolam',
    tagline: 'Where tradition meets digital creativity',
    slot: 'Slot 1',
    time: '8:45 – 10:45 AM',
    teaser:
      'The same floral rings, none of the physical petals. Design breathtaking festive pookkalams on a digital canvas.',
    description:
      'A theme-based digital art competition celebrating the traditional Kerala floral carpet. The official theme and secret design twists are announced at the 8:45 AM kickoff — Technology Meets Tradition, Kerala 2050, Digital Mahabali, Green Onam, or AI Meets Culture are the kind of prompts to expect. Craft your masterpiece with symmetry, vibrant colors, and digital flair!',
    deliverables: [
      'One high-resolution digital pookkalam artwork on the announced theme',
      'Any hidden design elements specified at the slot kickoff',
      'A concise one-line description of your creative concept',
    ],
    rules: [
      'Open exclusively to 2nd & 3rd Year IT students.',
      'Individual or team entry (up to 4 members).',
      'Any digital tool allowed — Figma, Illustrator, Photoshop, Procreate, Blender, Canva, or code/SVG/Canvas.',
      'The specific theme and design twist is revealed when the slot begins at 8:45 AM.',
      'All artwork must be created live during the slot. Pre-made templates are disqualified.',
      'Submit as PNG, JPG, or SVG at the specified resolution before 10:45 AM.',
    ],
    tags: ['Digital Art', 'Design', 'Creativity', 'Onam', 'Visual'],
    seal: { rings: [6, 12, 18], hue: 'marigold' },
    formUrl: FORM_LINKS.pookolam,
  },
  {
    id: 'webcraft',
    name: 'WebCraft AI: 90-Min Blitz',
    tagline: 'Prompt to Production · Build & Deploy in 90 Minutes',
    slot: 'Slot 2',
    time: '11:30 AM – 1:30 PM',
    teaser:
      'From prompt to production in 90 minutes. Harness AI tools, modern stacks, and rapid design to build and deploy a stunning, functional website.',
    description:
      'A high-speed AI web development sprint! Participants receive a live project brief at 11:30 AM and get exactly 90 minutes of intensive build time to generate, refine, style, and deploy a fully functional, responsive website. Leverage modern LLMs, generative UI tools, prompt engineering, and web frameworks to create an extraordinary digital experience against the clock.',
    sprintTimeline: [
      { n: '01', label: 'Briefing', text: '11:30 – 11:40 AM: Theme reveal & technical guidelines.' },
      { n: '02', label: 'AI Build Sprint', text: '11:40 AM – 1:10 PM: 90-minute live coding & prompt engineering window.' },
      { n: '03', label: 'Deploy & Pitch', text: '1:10 – 1:30 PM: Live URL deployment checks & jury walkthroughs.' },
    ],
    deliverables: [
      'Live deployed URL or running local application',
      'Source code repository with prompt history log',
      'Responsive UI with functional interactive components',
      '2-minute live walkthrough showcasing AI agility & design polish',
    ],
    rules: [
      'Open exclusively to 2nd & 3rd Year IT students.',
      'Individual or team entry (up to 4 members).',
      'Strict 90-minute build timer from 11:40 AM to 1:10 PM.',
      'Generative AI tools (v0, Bolt, Cursor, ChatGPT, Claude, Gemini, Copilot) are encouraged.',
      'Websites must be responsive across desktop and mobile screens.',
      'Evaluation is based on UI polish, responsiveness, feature completeness, and prompt ingenuity.',
      'Final live demonstration begins at 1:10 PM.',
    ],
    tags: ['AI & Web', 'Speed Build', 'Prompt Engineering', 'UI/UX', 'Frontend'],
    seal: { rings: [4, 16, 24], hue: 'violet' },
    formUrl: FORM_LINKS.webcraft,
  },
  {
    id: 'cricbid',
    name: 'CricBid: The IPL Mega Auction',
    tagline: 'Strategy · ₹100 Cr Purse · Assemble the Championship XI',
    slot: 'Slot 2',
    time: '11:30 AM – 1:30 PM',
    teaser:
      'Step into the shoes of IPL franchise owners. Manage your ₹100 Cr purse, outsmart rival bidders in live paddle wars, and build the ultimate dream XI!',
    description:
      'Experience the electric atmosphere of the IPL Mega Auction room! Each team represents a franchise armed with a virtual purse of ₹100 Crores. Engage in high-stakes bidding battles across Marquee superstars, Indian powerhouses, overseas legends, and tactical all-rounders. Master purse economics, predict rival bids, and build the most balanced championship squad.',
    auctionRounds: [
      { n: '01', label: 'Marquee Set', text: 'Iconic superstars & captaincy contenders.' },
      { n: '02', label: 'Indian Core', text: 'Explosive batsmen, finishers & wicketkeepers.' },
      { n: '03', label: 'Bowling Unit', text: 'Lethal pace attack & mystery spinners.' },
      { n: '04', label: 'Overseas & All-Rounders', text: 'Impact players & dynamic match-winners.' },
      { n: '05', label: 'Accelerated Round', text: 'Rapid-fire bidding & final squad ratification.' },
    ],
    deliverables: [
      'Official finalized Playing XI & squad sheet',
      'Purse utilization & financial balance breakdown',
      'Franchise strategy pitch explaining captaincy and tactical choices',
    ],
    rules: [
      'Open exclusively to 2nd & 3rd Year IT students.',
      'Teams of up to 4 franchise owners.',
      'Each franchise starts with an equal ₹100 Crore virtual budget.',
      'Squad composition rules apply (mandatory bowlers, wicketkeeper, max overseas in XI).',
      'Paddle raises must be rapid; highest valid bid before the gavel wins the player.',
      'Auctioneer’s hammer call and squad balance evaluations are final.',
    ],
    tags: ['IPL Auction', 'Strategy', 'Bidding', 'Cricket', 'Team Management'],
    seal: { rings: [10, 10, 20], hue: 'lavender' },
    formUrl: FORM_LINKS.cricbid,
  },
];

export function isFormLinkReady(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url.trim());
}
