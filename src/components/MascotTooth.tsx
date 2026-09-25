import React from 'react';

interface MascotToothProps {
  mood?: 'happy' | 'brushing' | 'superhero' | 'dirty' | 'sparkling' | 'cheering';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const MascotTooth: React.FC<MascotToothProps> = ({
  mood = 'happy',
  size = 'md',
  interactive = false,
  onClick,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-20 h-24',
    md: 'w-36 h-44',
    lg: 'w-52 h-60',
    xl: 'w-64 h-72',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-200 ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${sizeClasses} ${className}`}
    >
      <svg
        viewBox="0 0 200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl filter"
      >
        <defs>
          {/* Main tooth body gradient */}
          <linearGradient id="toothGradient" x1="100" y1="20" x2="100" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={mood === 'dirty' ? '#FFFBEB' : '#FFFFFF'} />
            <stop offset="70%" stopColor={mood === 'dirty' ? '#FEF3C7' : '#F0F9FF'} />
            <stop offset="100%" stopColor={mood === 'dirty' ? '#FDE68A' : '#E0F2FE'} />
          </linearGradient>

          {/* Blush gradient */}
          <radialGradient id="blushGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
          </radialGradient>

          {/* Golden Badge gradient */}
          <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>

          {/* Superhero Cape Gradient */}
          <linearGradient id="capeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
        </defs>

        {/* Superhero Cape */}
        {mood === 'superhero' && (
          <path
            d="M50 85 C20 120 10 180 35 220 C60 190 75 160 80 130 Z M150 85 C180 120 190 180 165 220 C140 190 125 160 120 130 Z"
            fill="url(#capeGrad)"
            className="animate-pulse"
          />
        )}

        {/* Tooth Body Outline & Fill */}
        <path
          d="M60 25 C30 28 20 65 24 105 C28 140 38 175 48 215 C54 228 72 225 78 205 C85 180 92 165 100 165 C108 165 115 180 122 205 C128 225 146 228 152 215 C162 175 172 140 176 105 C180 65 170 28 140 25 C122 23 110 33 100 33 C90 33 78 23 60 25 Z"
          fill="url(#toothGradient)"
          stroke={mood === 'dirty' ? '#D97706' : '#38BDF8'}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Shiny Gloss Reflection */}
        {mood !== 'dirty' && (
          <path
            d="M45 55 C40 85 45 115 50 130"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.9"
          />
        )}

        {/* Plaque / Dirt Spots if mood is dirty */}
        {mood === 'dirty' && (
          <g>
            <circle cx="55" cy="80" r="10" fill="#D97706" opacity="0.6" />
            <circle cx="145" cy="95" r="12" fill="#D97706" opacity="0.6" />
            <circle cx="68" cy="180" r="8" fill="#B45309" opacity="0.7" />
            <circle cx="130" cy="175" r="9" fill="#B45309" opacity="0.7" />
            <path d="M90 40 Q100 50 110 40" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {/* Cute Big Eyes */}
        <g>
          {mood === 'dirty' ? (
            /* Sad / Wincing Eyes */
            <>
              <path d="M65 88 Q75 78 85 88" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
              <path d="M115 88 Q125 78 135 88" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
              {/* Tear drop */}
              <circle cx="62" cy="100" r="4" fill="#38BDF8" />
            </>
          ) : mood === 'cheering' || mood === 'sparkling' ? (
            /* Joyful Closed Curved Eyes */
            <>
              <path d="M60 92 Q75 75 90 92" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M110 92 Q125 75 140 92" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" fill="none" />
              {/* Eye lashes */}
              <path d="M85 78 L92 73" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
              <path d="M115 78 L108 73" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            /* Big Sparkling Manga Eyes */
            <>
              {/* Left Eye */}
              <ellipse cx="75" cy="85" rx="12" ry="15" fill="#0F172A" />
              <circle cx="71" cy="79" r="5" fill="#FFFFFF" />
              <circle cx="79" cy="92" r="2.5" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="125" cy="85" rx="12" ry="15" fill="#0F172A" />
              <circle cx="121" cy="79" r="5" fill="#FFFFFF" />
              <circle cx="129" cy="92" r="2.5" fill="#FFFFFF" />
            </>
          )}
        </g>

        {/* Rosy Cheeks */}
        <circle cx="55" cy="105" r="12" fill="url(#blushGradient)" />
        <circle cx="145" cy="105" r="12" fill="url(#blushGradient)" />

        {/* Happy Smile / Mouth */}
        <g>
          {mood === 'dirty' ? (
            /* Wobbly Sad Mouth */
            <path d="M85 125 Q100 115 115 125" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" fill="none" />
          ) : (
            /* Wide Open Joyful Smile with Pink Tongue */
            <g>
              <path
                d="M75 112 Q100 145 125 112 Z"
                fill="#DC2626"
                stroke="#0F172A"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <path
                d="M85 125 Q100 118 115 125 Q100 144 85 125 Z"
                fill="#F472B6"
              />
            </g>
          )}
        </g>

        {/* Superhero Medal Badge */}
        {mood === 'superhero' && (
          <g>
            <circle cx="100" cy="155" r="18" fill="url(#goldGradient)" stroke="#B45309" strokeWidth="3" />
            <path
              d="M100 143 L104 151 L113 152 L106 158 L108 167 L100 162 L92 167 L94 158 L87 152 L96 151 Z"
              fill="#FFFFFF"
            />
          </g>
        )}

        {/* Brushing Bubbles and Foam */}
        {mood === 'brushing' && (
          <g className="animate-bounce">
            <circle cx="45" cy="35" r="12" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="2" opacity="0.9" />
            <circle cx="42" cy="32" r="3" fill="#FFFFFF" />
            <circle cx="155" cy="40" r="15" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="2" opacity="0.9" />
            <circle cx="151" cy="36" r="4" fill="#FFFFFF" />
            <circle cx="100" cy="20" r="10" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="2" opacity="0.9" />
            <circle cx="98" cy="18" r="2.5" fill="#FFFFFF" />
            <circle cx="30" cy="120" r="8" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="2" opacity="0.9" />
            <circle cx="170" cy="130" r="10" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="2" opacity="0.9" />
          </g>
        )}

        {/* Twinkling Stars / Sparkles */}
        {(mood === 'sparkling' || mood === 'cheering' || mood === 'superhero') && (
          <g>
            {/* Top Right Sparkle */}
            <path
              d="M175 40 Q175 55 190 55 Q175 55 175 70 Q175 55 160 55 Q175 55 175 40 Z"
              fill="#FDE047"
              className="animate-spin origin-[175px_55px]"
            />
            {/* Top Left Sparkle */}
            <path
              d="M25 50 Q25 60 35 60 Q25 60 25 70 Q25 60 15 60 Q25 60 25 50 Z"
              fill="#38BDF8"
            />
            {/* Bottom Right Sparkle */}
            <path
              d="M170 170 Q170 180 180 180 Q170 180 170 190 Q170 180 160 180 Q170 180 170 170 Z"
              fill="#F472B6"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
