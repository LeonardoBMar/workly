import * as React from 'react';

const SvgFeaturesApp = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 450"
    className={`h-auto w-full ${className || ''}`}
    {...props}
  >
    <defs>
      <linearGradient id="gradBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e0e7ff" />
        <stop offset="100%" stopColor="#ede9fe" />
      </linearGradient>
      <linearGradient id="gradCard" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="gradAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow
          dx="0"
          dy="10"
          stdDeviation="15"
          floodColor="#4f46e5"
          floodOpacity="0.15"
        />
      </filter>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Background blob */}
    <g className="animate-pulse-slow">
      <path
        fill="url(#gradBg)"
        d="M480.5,310.5Q451,396,365.5,420.5Q280,445,183.5,417.5Q87,390,56.5,307.5Q26,225,56,131Q86,37,180.5,23.5Q275,10,361.5,39.5Q448,69,479,147Q510,225,480.5,310.5Z"
      />
    </g>

    {/* Main Dashboard Window */}
    <g
      className="animate-float"
      transform="translate(50, 60)"
      filter="url(#shadow)"
    >
      <rect width="500" height="320" rx="16" fill="url(#gradCard)" />
      {/* Header bar */}
      <path
        d="M0 16 C0 7.163 7.163 0 16 0 L484 0 C492.837 0 500 7.163 500 16 L500 40 L0 40 L0 16 Z"
        fill="#f8fafc"
      />
      <circle cx="20" cy="20" r="4" fill="#ef4444" />
      <circle cx="36" cy="20" r="4" fill="#f59e0b" />
      <circle cx="52" cy="20" r="4" fill="#10b981" />

      {/* Sidebar background */}
      <rect x="0" y="40" width="120" height="280" fill="#f1f5f9" rx="0" />
      <rect x="15" y="60" width="90" height="12" rx="4" fill="#cbd5e1" />
      <rect x="15" y="90" width="70" height="12" rx="4" fill="#e2e8f0" />
      <rect x="15" y="115" width="80" height="12" rx="4" fill="#e2e8f0" />
      <rect x="15" y="140" width="60" height="12" rx="4" fill="#e2e8f0" />

      {/* Main content grid */}
      <rect x="140" y="60" width="340" height="12" rx="4" fill="#e2e8f0" />

      {/* Calendar Area */}
      <g transform="translate(140, 90)">
        <rect
          width="200"
          height="140"
          rx="8"
          fill="#ffffff"
          filter="url(#shadow)"
        />
        <rect x="15" y="15" width="40" height="40" rx="6" fill="#f1f5f9" />
        <rect
          x="65"
          y="15"
          width="40"
          height="40"
          rx="6"
          fill="url(#gradAccent)"
        />
        <rect x="115" y="15" width="40" height="40" rx="6" fill="#f1f5f9" />

        <rect x="15" y="65" width="40" height="40" rx="6" fill="#f1f5f9" />
        <rect x="65" y="65" width="40" height="40" rx="6" fill="#f1f5f9" />
        <rect x="115" y="65" width="40" height="40" rx="6" fill="#f1f5f9" />
      </g>

      {/* Analytics Chart */}
      <g transform="translate(360, 90)">
        <rect
          width="120"
          height="140"
          rx="8"
          fill="#ffffff"
          filter="url(#shadow)"
        />
        {/* Bars */}
        <rect x="15" y="80" width="16" height="45" rx="3" fill="#818cf8" />
        <rect x="40" y="50" width="16" height="75" rx="3" fill="#6366f1" />
        <rect
          x="65"
          y="25"
          width="16"
          height="100"
          rx="3"
          fill="url(#gradAccent)"
        />
        <rect x="90" y="60" width="16" height="65" rx="3" fill="#4f46e5" />
      </g>

      {/* Notification Toast */}
      <g transform="translate(140, 250)" filter="url(#shadow)">
        <rect width="340" height="40" rx="8" fill="#ffffff" />
        <circle cx="30" cy="20" r="10" fill="#10b981" />
        <path
          d="M25 20 l3 3 l6 -6"
          stroke="#ffffff"
          strokeWidth="2"
          fill="none"
        />
        <rect x="55" y="15" width="150" height="10" rx="3" fill="#cbd5e1" />
      </g>
    </g>

    {/* Floating elements */}
    <g
      transform="translate(420, 20)"
      className="animate-bounce"
      style={{ animationDuration: '4s' }}
    >
      <circle
        cx="30"
        cy="30"
        r="25"
        fill="#f59e0b"
        filter="url(#glow)"
        fillOpacity="0.8"
      />
      <path
        d="M22 22 l16 16 M38 22 l-16 16"
        stroke="#ffffff"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>

    <g
      transform="translate(10, 320)"
      className="animate-bounce"
      style={{ animationDuration: '5s' }}
    >
      <circle
        cx="20"
        cy="20"
        r="20"
        fill="#ec4899"
        filter="url(#glow)"
        fillOpacity="0.8"
      />
      <circle cx="20" cy="20" r="8" fill="#ffffff" />
    </g>
  </svg>
);

export default SvgFeaturesApp;
