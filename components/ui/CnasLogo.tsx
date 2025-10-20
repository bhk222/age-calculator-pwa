import React from 'react';

interface CnasLogoProps extends React.SVGProps<SVGSVGElement> {}

export const CnasLogo: React.FC<CnasLogoProps> = (props) => {
  const blue = "rgb(0, 111, 184)";
  return (
    <svg 
      viewBox="0 0 500 500" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Top arc for Arabic text */}
        <path 
          id="topArc" 
          fill="none" 
          d="M 70,250 A 180,180 0 0,1 430,250" 
        />
        {/* Bottom arc for French text */}
        <path 
          id="bottomArc" 
          fill="none" 
          d="M 430,250 A 180,180 0 0,1 70,250" 
        />
      </defs>

      {/* Outer blue circle */}
      <circle cx="250" cy="250" r="240" fill="white" stroke={blue} strokeWidth="12" />
      
      {/* Inner circle border */}
      <circle cx="250" cy="250" r="175" fill="white" stroke={blue} strokeWidth="8" />

      {/* Arabic text on top arc */}
      <text style={{ fontSize: '32px', fontWeight: '600', fill: blue, fontFamily: 'Arial, sans-serif' }} textAnchor="middle">
        <textPath href="#topArc" startOffset="50%">
          نظام التأمينات الإجتماعية
        </textPath>
      </text>
      
      {/* French text on bottom arc */}
      <text style={{ fontSize: '26px', fontWeight: '500', fill: blue, fontFamily: 'Arial, sans-serif' }} textAnchor="middle">
        <textPath href="#bottomArc" startOffset="50%">
          للعمال الأجراء
        </textPath>
      </text>

      {/* CNAS text at bottom */}
      <text x="250" y="430" style={{ fontSize: '72px', fontWeight: 'bold', fill: blue, fontFamily: 'Arial, sans-serif', letterSpacing: '4px' }} textAnchor="middle">
        CNAS
      </text>

      {/* Central pictogram - three people */}
      <g fill={blue}>
        {/* Left person - smaller */}
        <circle cx="180" cy="200" r="28" />
        <ellipse cx="180" cy="250" rx="32" ry="42" />
        
        {/* Center person - larger */}
        <circle cx="250" cy="180" r="38" />
        <ellipse cx="250" cy="245" rx="42" ry="55" />
        
        {/* Right person - smaller */}
        <circle cx="320" cy="200" r="28" />
        <ellipse cx="320" cy="250" rx="32" ry="42" />
      </g>

      {/* Hand/wave underneath */}
      <path 
        d="M 80,290 Q 120,270 180,275 Q 220,278 250,280 Q 280,278 320,275 Q 380,270 420,290 Q 380,330 320,320 Q 280,315 250,315 Q 220,315 180,320 Q 120,330 80,290 Z" 
        fill={blue} 
        opacity="0.9"
      />

    </svg>
  );
};
