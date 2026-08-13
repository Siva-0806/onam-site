// Richly Detailed Kathakali Dancer Face — Traditional Kerala Visual Identity
import React from 'react';

export default function KathakaliDancer() {
  return (
    <div className="kathakali-wrapper" aria-label="Kathakali dancer visual illustration">
      {/* Ambient background glow */}
      <div className="kathakali-glow" />

      {/* Floating flower petals and golden sparkles */}
      {[
        { top: '8%',  left: '6%',   color: '#E8B44F', dur: '6s',   delay: '0s',   size: 11 },
        { top: '14%', right: '8%',  color: '#F08A3C', dur: '7.5s', delay: '1.2s', size: 9 },
        { top: '65%', left: '4%',   color: '#C7ADF0', dur: '5.8s', delay: '0.5s', size: 10 },
        { top: '78%', right: '6%',  color: '#7C3FE4', dur: '8s',   delay: '2.1s', size: 12 },
        { top: '35%', left: '2%',   color: '#E8B44F', dur: '6.8s', delay: '3.2s', size: 8 },
        { top: '48%', right: '2%',  color: '#F08A3C', dur: '7.2s', delay: '1.7s', size: 10 },
        { top: '24%', left: '12%',  color: '#C7ADF0', dur: '8.5s', delay: '0.8s', size: 9 },
        { top: '85%', left: '16%',  color: '#E8B44F', dur: '5.2s', delay: '2.5s', size: 11 },
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

      {/* Subtle floating tech/culture particles */}
      <div className="hero__tech-tag" style={{ top: '18%', left: '-2%', animationDelay: '0.6s' }}>{'{ }'}</div>
      <div className="hero__tech-tag" style={{ bottom: '16%', right: '-2%', animationDelay: '1.8s' }}>{'01'}</div>

      <svg
        className="kathakali-svg"
        viewBox="0 0 420 520"
        role="img"
        aria-label="Kathakali Dancer Face"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="kkGoldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF3A3" />
            <stop offset="35%" stopColor="#FFD700" />
            <stop offset="70%" stopColor="#E8B44F" />
            <stop offset="100%" stopColor="#9E6B15" />
          </linearGradient>

          <linearGradient id="kkCrownTier" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE57F" />
            <stop offset="50%" stopColor="#E8B44F" />
            <stop offset="100%" stopColor="#B37C19" />
          </linearGradient>

          <linearGradient id="kkFaceGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4BB86E" />
            <stop offset="50%" stopColor="#2E8B4D" />
            <stop offset="100%" stopColor="#185E30" />
          </linearGradient>

          <linearGradient id="kkChuttiWhite" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="50%" stopColor="#F5EDDA" />
            <stop offset="100%" stopColor="#E5D6B8" />
          </linearGradient>

          <linearGradient id="kkRedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F04337" />
            <stop offset="60%" stopColor="#D3251A" />
            <stop offset="100%" stopColor="#8F140D" />
          </linearGradient>

          <linearGradient id="kkVioletJewel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B894FF" />
            <stop offset="100%" stopColor="#5522A8" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="kkGoldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
            <feFlood floodColor="#FFD700" floodOpacity="0.75" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="kkFaceGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur" />
            <feFlood floodColor="#2E8B4D" floodOpacity="0.4" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="shadow" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ══════════════════════════════════════════════════════════════
            1. KIREEDAM (THE ROYAL CROWN)
        ══════════════════════════════════════════════════════════════ */}
        <g className="kathakali-crown" filter="url(#kkGoldGlow)">
          {/* Outer halo disc behind crown */}
          <circle cx="210" cy="140" r="125" fill="none" stroke="url(#kkGoldGrad)" strokeWidth="3" opacity="0.45" strokeDasharray="6 4" />
          <circle cx="210" cy="140" r="115" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.3" />

          {/* Tier 1 - Base Arch */}
          <path d="M100,140 Q210,110 320,140 L310,165 Q210,135 110,165 Z" fill="url(#kkCrownTier)" />
          <path d="M110,148 Q210,122 310,148" fill="none" stroke="#FFF3A3" strokeWidth="2" opacity="0.8" />

          {/* Tier 1 Jewels */}
          {[130, 155, 180, 210, 240, 265, 290].map((x, i) => (
            <circle
              key={`t1-${i}`}
              cx={x}
              cy={138 + Math.sin((i / 6) * Math.PI) * -8}
              r={i === 3 ? 5.5 : 4}
              fill={i % 2 === 0 ? 'url(#kkRedGrad)' : 'url(#kkVioletJewel)'}
              stroke="#FFE57F"
              strokeWidth="1"
            />
          ))}

          {/* Tier 2 - Conical Mid Tier */}
          <path d="M125,115 Q210,90 295,115 L285,138 Q210,116 135,138 Z" fill="url(#kkGoldGrad)" />
          {[150, 175, 210, 245, 270].map((x, i) => (
            <rect
              key={`t2-${i}`}
              x={x - 4}
              y={116 + Math.sin((i / 4) * Math.PI) * -5}
              width="8"
              height="8"
              rx="1.5"
              fill={i === 2 ? '#E8B44F' : '#E63528'}
              transform={`rotate(45 ${x} ${120 + Math.sin((i / 4) * Math.PI) * -5})`}
            />
          ))}

          {/* Tier 3 - Upper Disc */}
          <path d="M150,78 Q210,60 270,78 L262,108 Q210,92 158,108 Z" fill="url(#kkCrownTier)" />
          <ellipse cx="210" cy="84" rx="20" ry="7" fill="url(#kkRedGrad)" stroke="#FFD700" strokeWidth="1.5" />

          {/* Tier 4 - Tower Dome */}
          <path d="M172,45 Q210,30 248,45 L242,74 Q210,62 178,74 Z" fill="url(#kkGoldGrad)" />

          {/* Top Lotus Finial */}
          <ellipse cx="210" cy="30" rx="14" ry="18" fill="url(#kkGoldGrad)" />
          <ellipse cx="210" cy="22" rx="7" ry="10" fill="#FFF3A3" />
          <circle cx="210" cy="10" r="5" fill="#E63528" stroke="#FFD700" strokeWidth="1.5" />

          {/* Side Ornament Wings (Chevikettu / Karnapatram) */}
          {/* Left Wing */}
          <path d="M105,148 C75,130 65,95 80,75 C95,95 105,120 110,140 Z" fill="url(#kkGoldGrad)" />
          <circle cx="78" cy="95" r="7" fill="url(#kkVioletJewel)" stroke="#FFD700" strokeWidth="1.5" />
          <circle cx="85" cy="120" r="4" fill="url(#kkRedGrad)" />
          <line x1="88" y1="140" x2="68" y2="185" stroke="#E8B44F" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="68" cy="190" r="5.5" fill="url(#kkGoldGrad)" />
          <circle cx="68" cy="204" r="3.5" fill="#E63528" />

          {/* Right Wing */}
          <path d="M315,148 C345,130 355,95 340,75 C325,95 315,120 310,140 Z" fill="url(#kkGoldGrad)" />
          <circle cx="342" cy="95" r="7" fill="url(#kkVioletJewel)" stroke="#FFD700" strokeWidth="1.5" />
          <circle cx="335" cy="120" r="4" fill="url(#kkRedGrad)" />
          <line x1="332" y1="140" x2="352" y2="185" stroke="#E8B44F" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="352" cy="190" r="5.5" fill="url(#kkGoldGrad)" />
          <circle cx="352" cy="204" r="3.5" fill="#E63528" />
        </g>

        {/* ══════════════════════════════════════════════════════════════
            2. FACE, CHUTTI, EYES, AND TRADITIONAL MAKEUP
        ══════════════════════════════════════════════════════════════ */}
        <g className="kathakali-face">
          {/* Base Cream/Gold Beard Flare (Chutti Beard Frame) */}
          <path
            d="M95,350 C90,420 135,465 210,470 C285,465 330,420 325,350 C300,430 255,452 210,454 C165,452 120,430 95,350 Z"
            fill="url(#kkChuttiWhite)"
            stroke="#E8B44F"
            strokeWidth="1.5"
          />

          {/* Outer Layered Chutti Ridge */}
          <path
            d="M106,230 C90,320 120,410 210,435 C300,410 330,320 314,230 C322,310 292,395 210,418 C128,395 98,310 106,230 Z"
            fill="url(#kkChuttiWhite)"
            stroke="#D8C7A5"
            strokeWidth="1.2"
          />

          {/* Inner Chutti White Border */}
          <path
            d="M116,210 C106,285 130,380 210,402 C290,380 314,285 304,210 C310,275 284,365 210,386 C136,365 110,275 116,210 Z"
            fill="#FFFDF7"
            stroke="#E8B44F"
            strokeWidth="1"
          />

          {/* Green Face Base (Paccha) */}
          <ellipse cx="210" cy="285" rx="96" ry="115" fill="url(#kkFaceGreen)" filter="url(#kkFaceGlow)" />

          {/* Forehead Red Chutti Zone */}
          <path
            d="M130,225 C145,185 175,170 210,170 C245,170 275,185 290,225 C265,200 240,192 210,192 C180,192 155,200 130,225 Z"
            fill="url(#kkRedGrad)"
          />

          {/* Forehead Sacred Mark / Tikka (Namam) */}
          <g filter="url(#kkGoldGlow)">
            <ellipse cx="210" cy="205" rx="8" ry="14" fill="#FFD700" />
            <circle cx="210" cy="205" r="4.5" fill="url(#kkRedGrad)" />
            {/* Ray Lines */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <line
                key={`ray-${deg}`}
                x1={210 + 10 * Math.cos((deg * Math.PI) / 180)}
                y1={205 + 10 * Math.sin((deg * Math.PI) / 180)}
                x2={210 + 16 * Math.cos((deg * Math.PI) / 180)}
                y2={205 + 16 * Math.sin((deg * Math.PI) / 180)}
                stroke="#FFD700"
                strokeWidth="1.5"
              />
            ))}
          </g>

          {/* Eyebrow Arches */}
          {/* Left Eyebrow */}
          <path d="M132,242 Q164,215 194,236" fill="none" stroke="#FFFDF7" strokeWidth="9" strokeLinecap="round" />
          <path d="M134,242 Q164,217 192,237" fill="none" stroke="#120A20" strokeWidth="3.5" strokeLinecap="round" />

          {/* Right Eyebrow */}
          <path d="M226,236 Q256,215 288,242" fill="none" stroke="#FFFDF7" strokeWidth="9" strokeLinecap="round" />
          <path d="M228,237 Q256,217 286,242" fill="none" stroke="#120A20" strokeWidth="3.5" strokeLinecap="round" />

          {/* ── Expressive Eyes with Kohl Wings (Animated) ── */}
          <g className="kathakali-eyes">
            {/* Left Eye */}
            <g transform="translate(162, 268)">
              <ellipse rx="22" ry="14" fill="#FFFDF7" stroke="#C4B088" strokeWidth="0.8" />
              {/* Iris */}
              <circle cx="2" cy="1" r="10.5" fill="#120A20" />
              <circle cx="2" cy="1" r="6.5" fill="#4B208A" />
              <circle cx="2" cy="1" r="3.5" fill="#7C3FE4" />
              {/* Highlight */}
              <circle cx="5" cy="-2" r="3" fill="#FFFDF7" opacity="0.9" />
              {/* Upper Kohl Stroke */}
              <path d="M-22,-1 Q-10,-12 0,-13 Q10,-12 22,-1" fill="none" stroke="#120A20" strokeWidth="3" />
              {/* Lower Kohl Stroke */}
              <path d="M-22,-1 Q-10,10 0,11 Q10,10 22,-1" fill="none" stroke="#120A20" strokeWidth="2.5" />
              {/* Extended Wing Stroke */}
              <path d="M-22,-1 L-36,-7" stroke="#120A20" strokeWidth="3" strokeLinecap="round" />
              <path d="M22,-1 L34,-6" stroke="#120A20" strokeWidth="2.5" strokeLinecap="round" />
              {/* Red Corner Accent */}
              <circle cx="-22" cy="-1" r="2.8" fill="#E63528" />
            </g>

            {/* Right Eye */}
            <g transform="translate(258, 268)">
              <ellipse rx="22" ry="14" fill="#FFFDF7" stroke="#C4B088" strokeWidth="0.8" />
              <circle cx="-2" cy="1" r="10.5" fill="#120A20" />
              <circle cx="-2" cy="1" r="6.5" fill="#4B208A" />
              <circle cx="-2" cy="1" r="3.5" fill="#7C3FE4" />
              <circle cx="1" cy="-2" r="3" fill="#FFFDF7" opacity="0.9" />
              <path d="M-22,-1 Q-10,-12 0,-13 Q10,-12 22,-1" fill="none" stroke="#120A20" strokeWidth="3" />
              <path d="M-22,-1 Q-10,10 0,11 Q10,10 22,-1" fill="none" stroke="#120A20" strokeWidth="2.5" />
              <path d="M-22,-1 L-34,-6" stroke="#120A20" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M22,-1 L36,-7" stroke="#120A20" strokeWidth="3" strokeLinecap="round" />
              <circle cx="22" cy="-1" r="2.8" fill="#E63528" />
            </g>
          </g>

          {/* Cheek Decorative Patterns (Chutti Accents) */}
          <ellipse cx="140" cy="305" rx="16" ry="24" fill="#F08A3C" opacity="0.3" />
          <ellipse cx="280" cy="305" rx="16" ry="24" fill="#F08A3C" opacity="0.3" />

          {/* Nose */}
          <path d="M204,272 Q200,312 196,324 Q204,330 210,330 Q216,330 224,324 Q220,312 216,272 Z" fill="#185E30" opacity="0.6" />
          <circle cx="198" cy="325" r="5" fill="#E8B44F" opacity="0.4" />
          <circle cx="222" cy="325" r="5" fill="#E8B44F" opacity="0.4" />

          {/* Lips (Vibrant Red Traditional Smile) */}
          <path d="M172,348 Q192,336 210,336 Q228,336 248,348 Q234,368 210,370 Q186,368 172,348 Z" fill="url(#kkRedGrad)" />
          <path d="M172,348 Q192,358 210,358 Q228,358 248,348" fill="none" stroke="#8F140D" strokeWidth="1.8" />
          <circle cx="170" cy="348" r="2.5" fill="#FFD700" />
          <circle cx="250" cy="348" r="2.5" fill="#FFD700" />

          {/* Chin Accent */}
          <circle cx="210" cy="385" r="5" fill="#FFD700" opacity="0.85" />
          <circle cx="210" cy="385" r="2.5" fill="url(#kkRedGrad)" />

          {/* ── Royal Earrings (Kundalam) ── */}
          <g filter="url(#kkGoldGlow)">
            {/* Left Earring */}
            <circle cx="98" cy="292" r="16" fill="url(#kkCrownTier)" stroke="#FFD700" strokeWidth="2" />
            <circle cx="98" cy="292" r="8" fill="url(#kkRedGrad)" />
            <circle cx="98" cy="292" r="3.5" fill="#FFF3A3" />
            <line x1="98" y1="308" x2="98" y2="336" stroke="#FFD700" strokeWidth="2.5" />
            <circle cx="98" cy="342" r="6" fill="url(#kkVioletJewel)" stroke="#FFD700" strokeWidth="1" />

            {/* Right Earring */}
            <circle cx="322" cy="292" r="16" fill="url(#kkCrownTier)" stroke="#FFD700" strokeWidth="2" />
            <circle cx="322" cy="292" r="8" fill="url(#kkRedGrad)" />
            <circle cx="322" cy="292" r="3.5" fill="#FFF3A3" />
            <line x1="322" y1="308" x2="322" y2="336" stroke="#FFD700" strokeWidth="2.5" />
            <circle cx="322" cy="342" r="6" fill="url(#kkVioletJewel)" stroke="#FFD700" strokeWidth="1" />
          </g>

          {/* ── Traditional Garland & Necklace (Mala) ── */}
          <g filter="url(#kkGoldGlow)">
            <path d="M140,410 Q210,440 280,410" fill="none" stroke="#FFD700" strokeWidth="3" />
            {[155, 175, 195, 210, 225, 245, 265].map((x, i) => (
              <circle
                key={`mala-${i}`}
                cx={x}
                cy={414 + Math.sin((i / 6) * Math.PI) * 12}
                r={i === 3 ? 5.5 : 4}
                fill={i % 3 === 0 ? 'url(#kkRedGrad)' : i % 3 === 1 ? '#FFD700' : 'url(#kkVioletJewel)'}
                stroke="#FFF3A3"
                strokeWidth="1"
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
