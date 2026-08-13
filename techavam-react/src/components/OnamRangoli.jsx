// Detailed Onam Pookalam / Floral Rangoli with Subtle IT/Technology Integration
import React from 'react';

export default function OnamRangoli() {
  const petalsTier1 = 8;
  const petalsTier2 = 16;
  const petalsTier3 = 24;
  const circuitNodes = 32;

  return (
    <div className="rangoli-wrapper" aria-label="Onam Pookalam floral rangoli with subtle technology elements">
      {/* Outer ambient glow rings */}
      <div className="rangoli-glow rangoli-glow--outer" />
      <div className="rangoli-glow rangoli-glow--inner" />

      {/* Floating flower petals & tech particles around Pookalam */}
      {[
        { top: '10%', right: '6%',  color: '#E8B44F', dur: '6.2s', delay: '0.2s', size: 10 },
        { top: '16%', left: '8%',   color: '#F08A3C', dur: '7.8s', delay: '1.4s', size: 8 },
        { top: '68%', right: '4%',  color: '#C7ADF0', dur: '5.6s', delay: '0.7s', size: 11 },
        { top: '80%', left: '8%',   color: '#7C3FE4', dur: '8.2s', delay: '2.3s', size: 9 },
        { top: '38%', right: '2%',  color: '#E8B44F', dur: '6.5s', delay: '3.1s', size: 12 },
        { top: '45%', left: '2%',   color: '#F08A3C', dur: '7.0s', delay: '1.9s', size: 9 },
      ].map((p, i) => (
        <div
          key={i}
          className="hero__petal"
          style={{
            top: p.top,
            left: p.left,
            right: p.right,
            background: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: i % 2 === 0 ? '50% 0' : '0 50%',
            animationDuration: p.dur,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Subtle floating tech tokens */}
      <div className="hero__tech-tag" style={{ top: '16%', right: '-2%', animationDelay: '0.9s' }}>{'< />'}</div>
      <div className="hero__tech-tag" style={{ bottom: '18%', left: '-2%', animationDelay: '2.1s' }}>{'10'}</div>

      {/* Symmetrical Pookalam SVG */}
      <div className="rangoli-svg-wrap">
        <svg
          viewBox="0 0 500 500"
          role="img"
          aria-label="Festive Onam Pookalam Rangoli"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="pookGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF3A3" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#E8B44F" />
            </linearGradient>

            <linearGradient id="pookOrange" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFA64D" />
              <stop offset="100%" stopColor="#E65100" />
            </linearGradient>

            <linearGradient id="pookRed" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FF5252" />
              <stop offset="100%" stopColor="#B71C1C" />
            </linearGradient>

            <linearGradient id="pookViolet" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C7ADF0" />
              <stop offset="50%" stopColor="#7C3FE4" />
              <stop offset="100%" stopColor="#3B1278" />
            </linearGradient>

            <linearGradient id="pookGreen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#69F0AE" />
              <stop offset="60%" stopColor="#2E7D32" />
              <stop offset="100%" stopColor="#1B5E20" />
            </linearGradient>

            <linearGradient id="pookCream" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F5ECD7" />
            </linearGradient>

            {/* Glow */}
            <filter id="pookGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feFlood floodColor="#FFD700" floodOpacity="0.6" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="shadow" />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g transform="translate(250, 250)">
            {/* ═══════════════════════════════════════════════════════════
                LAYER 1: OUTER TECHNO-CIRCUIT TRACK (SUBTLE IT ELEMENTS)
            ═══════════════════════════════════════════════════════════ */}
            {/* Outer boundary ring with circuit guide lines */}
            <circle r="238" fill="none" stroke="#E8B44F" strokeWidth="1.2" opacity="0.35" />
            <circle r="228" fill="none" stroke="#7C3FE4" strokeWidth="1" opacity="0.4" strokeDasharray="8 4" />
            <circle r="218" fill="none" stroke="#E8B44F" strokeWidth="1.5" opacity="0.5" />

            {/* Rotating Outer Tech Nodes Ring */}
            <g className="ring ring--rev" style={{ transformOrigin: '0 0', animationDuration: '140s' }}>
              {Array.from({ length: circuitNodes }).map((_, i) => {
                const deg = (360 / circuitNodes) * i;
                const isCodeNode = i % 4 === 0;
                const isBinaryNode = i % 4 === 2;
                return (
                  <g key={`tech-node-${i}`} transform={`rotate(${deg})`}>
                    {/* Circuit trace spoke */}
                    <line x1="0" y1="-218" x2="0" y2="-236" stroke="#E8B44F" strokeWidth="1.4" opacity="0.7" />
                    {/* Solder node / pad */}
                    <circle cx="0" cy="-236" r="3" fill={i % 2 === 0 ? '#FFD700' : '#7C3FE4'} opacity="0.9" />
                    <circle cx="0" cy="-236" r="1.5" fill="#FFFDF7" />

                    {/* Subtle code symbols at cardinal positions */}
                    {isCodeNode && (
                      <text
                        x="0"
                        y="-242"
                        textAnchor="middle"
                        fill="#E8B44F"
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                        opacity="0.8"
                      >
                        {i % 8 === 0 ? '{ }' : '< />'}
                      </text>
                    )}
                    {isBinaryNode && (
                      <text
                        x="0"
                        y="-242"
                        textAnchor="middle"
                        fill="#C7ADF0"
                        fontSize="8"
                        fontFamily="monospace"
                        opacity="0.75"
                      >
                        {i % 8 === 2 ? '01' : '10'}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* ═══════════════════════════════════════════════════════════
                LAYER 2: TIER 3 - OUTER MARIGOLD & VIOLET PETALS (SLOW CLOCKWISE)
            ═══════════════════════════════════════════════════════════ */}
            <g className="ring" style={{ transformOrigin: '0 0', animationDuration: '100s' }}>
              {/* Outer Violet Geometrics */}
              {Array.from({ length: petalsTier3 }).map((_, i) => {
                const deg = (360 / petalsTier3) * i;
                return (
                  <g key={`t3-v-${i}`} transform={`rotate(${deg})`}>
                    <path
                      d="M0,-175 Q16,-195 0,-216 Q-16,-195 0,-175 Z"
                      fill="url(#pookViolet)"
                      stroke="#FFD700"
                      strokeWidth="0.8"
                      opacity="0.9"
                    />
                  </g>
                );
              })}

              {/* Marigold Orange Interlocking Petals */}
              {Array.from({ length: petalsTier3 }).map((_, i) => {
                const deg = (360 / petalsTier3) * i + 360 / petalsTier3 / 2;
                return (
                  <g key={`t3-o-${i}`} transform={`rotate(${deg})`}>
                    <path
                      d="M0,-155 Q20,-182 0,-206 Q-20,-182 0,-155 Z"
                      fill="url(#pookOrange)"
                      stroke="#FFF3A3"
                      strokeWidth="0.8"
                      opacity="0.95"
                    />
                    <circle cx="0" cy="-188" r="2.5" fill="#FFE57F" />
                  </g>
                );
              })}
            </g>

            {/* ═══════════════════════════════════════════════════════════
                LAYER 3: TIER 2 - KERALA GREEN & WHITE PETALS (REVERSE SPIN)
            ═══════════════════════════════════════════════════════════ */}
            <circle r="156" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.6" />
            <circle r="150" fill="none" stroke="#FFA64D" strokeWidth="1" opacity="0.4" />

            <g className="ring ring--rev" style={{ transformOrigin: '0 0', animationDuration: '75s' }}>
              {/* Green Fresh Leaf Layer */}
              {Array.from({ length: petalsTier2 }).map((_, i) => {
                const deg = (360 / petalsTier2) * i;
                return (
                  <g key={`t2-g-${i}`} transform={`rotate(${deg})`}>
                    <path
                      d="M0,-115 Q26,-138 0,-154 Q-26,-138 0,-115 Z"
                      fill="url(#pookGreen)"
                      stroke="#FFD700"
                      strokeWidth="1"
                      opacity="0.95"
                    />
                    <line x1="0" y1="-118" x2="0" y2="-148" stroke="#A7F3D0" strokeWidth="1" opacity="0.7" />
                  </g>
                );
              })}

              {/* Cream & White Inner Petals */}
              {Array.from({ length: petalsTier2 }).map((_, i) => {
                const deg = (360 / petalsTier2) * i + 360 / petalsTier2 / 2;
                return (
                  <g key={`t2-c-${i}`} transform={`rotate(${deg})`}>
                    <path
                      d="M0,-95 Q20,-118 0,-138 Q-20,-118 0,-95 Z"
                      fill="url(#pookCream)"
                      stroke="#E8B44F"
                      strokeWidth="1"
                      opacity="0.95"
                    />
                    <circle cx="0" cy="-122" r="3" fill="#E65100" />
                  </g>
                );
              })}
            </g>

            {/* ═══════════════════════════════════════════════════════════
                LAYER 4: TIER 1 - GOLDEN RED LOTUS CORE (CLOCKWISE SPIN)
            ═══════════════════════════════════════════════════════════ */}
            <circle r="96" fill="none" stroke="#FFD700" strokeWidth="2.5" opacity="0.8" />

            <g className="ring" style={{ transformOrigin: '0 0', animationDuration: '50s' }}>
              {/* Crimson Red Flower Petals */}
              {Array.from({ length: petalsTier1 }).map((_, i) => {
                const deg = (360 / petalsTier1) * i;
                return (
                  <g key={`t1-r-${i}`} transform={`rotate(${deg})`}>
                    <path
                      d="M0,-45 Q28,-72 0,-94 Q-28,-72 0,-45 Z"
                      fill="url(#pookRed)"
                      stroke="#FFD700"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M0,-52 Q14,-72 0,-86 Q-14,-72 0,-52 Z"
                      fill="url(#pookGold)"
                      opacity="0.85"
                    />
                  </g>
                );
              })}
            </g>

            {/* ═══════════════════════════════════════════════════════════
                LAYER 5: CENTER GLOWING DIYA / TECH CORE
            ═══════════════════════════════════════════════════════════ */}
            <circle r="46" fill="url(#pookGold)" filter="url(#pookGlow)" />
            <circle r="46" fill="none" stroke="#FFF3A3" strokeWidth="2" />
            <circle r="36" fill="url(#pookOrange)" />
            <circle r="26" fill="url(#pookRed)" />
            <circle r="14" fill="#FFD700" />
            <circle r="6"  fill="#180B2C" />

            {/* Center Radiant Star Sparks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={`spark-${deg}`}
                x1="0"
                y1="0"
                x2={38 * Math.cos((deg * Math.PI) / 180)}
                y2={38 * Math.sin((deg * Math.PI) / 180)}
                stroke="#FFF3A3"
                strokeWidth="1.5"
                opacity="0.85"
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Pulsing Diya Nodes around perimeter */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const r = 51; // % radius
        const rad = (deg * Math.PI) / 180;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);
        const colors = ['#FFD700', '#F08A3C', '#C7ADF0', '#FF5252', '#FFD700', '#F08A3C', '#C7ADF0', '#69F0AE'];
        return (
          <div
            key={`diya-${deg}`}
            className="rangoli-dot"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              background: colors[deg / 45],
              color: colors[deg / 45],
              animationDelay: `${(deg / 45) * 0.35}s`,
            }}
          />
        );
      })}
    </div>
  );
}
