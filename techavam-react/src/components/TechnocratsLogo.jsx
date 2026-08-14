export default function TechnocratsLogo({ className = 'technocrats-logo', size = 80 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Technocrats IT Department Logo"
    >
      <defs>
        {/* Background gradient */}
        <radialGradient id="techBg" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2D114D" />
          <stop offset="60%" stopColor="#170828" />
          <stop offset="100%" stopColor="#0B0214" />
        </radialGradient>

        {/* Gold metallic gradient */}
        <linearGradient id="techGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF3B0" />
          <stop offset="35%" stopColor="#E8B44F" />
          <stop offset="70%" stopColor="#C68A1B" />
          <stop offset="100%" stopColor="#8C580B" />
        </linearGradient>

        {/* Soft glow */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Hexagonal / Octagonal Tech Shield Base */}
      <polygon
        points="50,4 88,18 96,56 78,90 50,98 22,90 4,56 12,18"
        fill="url(#techBg)"
        stroke="url(#techGold)"
        strokeWidth="1.8"
      />

      {/* Inner Concentric Tech Track */}
      <polygon
        points="50,9 83,21 90,55 74,85 50,93 26,85 10,55 17,21"
        fill="none"
        stroke="rgba(232, 180, 79, 0.3)"
        strokeWidth="0.8"
        strokeDasharray="4 2.5"
      />

      {/* Microchip pin contacts */}
      <g stroke="url(#techGold)" strokeWidth="1" strokeLinecap="round" opacity="0.85">
        {/* Left pins */}
        <line x1="3" y1="36" x2="10" y2="36" />
        <line x1="2" y1="46" x2="9" y2="46" />
        <line x1="3" y1="56" x2="10" y2="56" />
        {/* Right pins */}
        <line x1="97" y1="36" x2="90" y2="36" />
        <line x1="98" y1="46" x2="91" y2="46" />
        <line x1="97" y1="56" x2="90" y2="56" />
      </g>

      {/* Circuit Board Trace Lines & Connection Nodes */}
      <g stroke="url(#techGold)" strokeWidth="1" fill="none" opacity="0.8">
        {/* Top left trace */}
        <path d="M 22 28 L 32 28 L 38 34" />
        <circle cx="22" cy="28" r="1.5" fill="#FFF3B0" />

        {/* Top right trace */}
        <path d="M 78 28 L 68 28 L 62 34" />
        <circle cx="78" cy="28" r="1.5" fill="#FFF3B0" />

        {/* Bottom left trace */}
        <path d="M 30 76 L 40 76 L 46 70" />
        <circle cx="30" cy="76" r="1.5" fill="#FFF3B0" />

        {/* Bottom right trace */}
        <path d="M 70 76 L 60 76 L 54 70" />
        <circle cx="70" cy="76" r="1.5" fill="#FFF3B0" />

        {/* Vertical bottom spine traces */}
        <path d="M 50 81 L 50 88" strokeDasharray="1.5 1.5" />
      </g>

      {/* Stylized Technocrats 'T' Monogram */}
      <g filter="url(#goldGlow)">
        {/* Top horizontal Bar of T */}
        <polygon
          points="24,30 76,30 72,40 58,40 58,42 42,42 42,40 28,40"
          fill="url(#techGold)"
        />
        {/* Center Vertical Stem of T */}
        <polygon
          points="44,40 56,40 54,72 50,77 46,72"
          fill="url(#techGold)"
        />
        {/* Internal Cyber Core Notch */}
        <polygon
          points="50,33 54,37 50,41 46,37"
          fill="#170828"
          stroke="url(#techGold)"
          strokeWidth="0.8"
        />
        <circle cx="50" cy="37" r="1.2" fill="#00E5FF" />
      </g>

      {/* Terminal Node Accents */}
      <circle cx="50" cy="77" r="1.8" fill="#00E5FF" stroke="url(#techGold)" strokeWidth="0.7" />
      <circle cx="28" cy="35" r="1.2" fill="#FFF3B0" />
      <circle cx="72" cy="35" r="1.2" fill="#FFF3B0" />

      {/* Bottom IT Dept Tag / Wordmark */}
      <text
        x="50"
        y="88"
        textAnchor="middle"
        fill="url(#techGold)"
        fontSize="5.2"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="bold"
        letterSpacing="1.8"
      >
        IT DEPT
      </text>
    </svg>
  );
}
