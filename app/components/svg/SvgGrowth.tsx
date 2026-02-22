import * as React from 'react';

const SvgGrowth = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 300"
    className={`h-auto w-full ${className || ''}`}
    {...props}
  >
    <defs>
      <linearGradient id="rocketGrad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>

      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
      </linearGradient>

      <filter id="shadowGrowth" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow
          dx="0"
          dy="8"
          stdDeviation="10"
          floodColor="#6366f1"
          floodOpacity="0.3"
        />
      </filter>
    </defs>

    <g className="animate-float">
      {/* Background Chart Area */}
      <path
        d="M 50 250 L 50 150 Q 100 120 150 130 T 250 80 T 350 30 L 350 250 Z"
        fill="url(#chartGrad)"
      />
      <path
        d="M 50 150 Q 100 120 150 130 T 250 80 T 350 30"
        stroke="#10b981"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Grid Lines */}
      <line
        x1="50"
        y1="200"
        x2="350"
        y2="200"
        stroke="#e2e8f0"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="50"
        y1="150"
        x2="350"
        y2="150"
        stroke="#e2e8f0"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <line
        x1="50"
        y1="100"
        x2="350"
        y2="100"
        stroke="#e2e8f0"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Dots on chart */}
      <circle
        cx="150"
        cy="130"
        r="5"
        fill="#10b981"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <circle
        cx="250"
        cy="80"
        r="5"
        fill="#10b981"
        stroke="#ffffff"
        strokeWidth="2"
      />

      {/* Rocket Graphic */}
      <g transform="translate(240, -10)" filter="url(#shadowGrowth)">
        {/* Flame */}
        <path
          d="M40 100 Q 20 130 40 160 Q 60 130 40 100"
          fill="#f59e0b"
          className="animate-pulse"
        />
        <path
          d="M40 110 Q 30 130 40 140 Q 50 130 40 110"
          fill="#fef08a"
          className="animate-pulse"
        />

        {/* Rocket Body */}
        <path
          d="M40 20 C 20 50 20 80 40 100 C 60 80 60 50 40 20 Z"
          fill="url(#rocketGrad)"
        />
        <path d="M40 20 L 25 60 L 55 60 Z" fill="#ffffff" opacity="0.2" />

        {/* Fins */}
        <path d="M25 80 L 5 110 L 30 95 Z" fill="#6366f1" />
        <path d="M55 80 L 75 110 L 50 95 Z" fill="#4f46e5" />

        {/* Window */}
        <circle cx="40" cy="60" r="8" fill="#e0e7ff" />
        <circle cx="40" cy="60" r="5" fill="#ffffff" />
      </g>
    </g>

    {/* Sparkles */}
    <g className="animate-pulse-slow">
      <path
        d="M 320 60 L 325 70 L 335 75 L 325 80 L 320 90 L 315 80 L 305 75 L 315 70 Z"
        fill="#fcd34d"
      />
      <path
        d="M 120 70 L 123 75 L 128 78 L 123 80 L 120 85 L 118 80 L 113 78 L 118 75 Z"
        fill="#fcd34d"
      />
    </g>
  </svg>
);

export default SvgGrowth;
