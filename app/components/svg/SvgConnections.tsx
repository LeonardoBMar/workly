import * as React from 'react';

const SvgConnections = ({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 600 200"
    className={`h-auto w-full ${className || ''}`}
    {...props}
  >
    <defs>
      <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0" />
        <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
      </linearGradient>

      <linearGradient id="lineGrad2" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
        <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
        <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
      </linearGradient>

      <filter id="glowNodes" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <g strokeWidth="2" fill="none">
      {/* Curved connection lines with animation */}
      <path
        d="M50 150 Q 200 50 300 100 T 550 50"
        stroke="url(#lineGrad1)"
        strokeDasharray="600"
        strokeDashoffset="0"
        className="animate-[dash_8s_linear_infinite]"
      />

      <path
        d="M100 50 Q 250 150 400 80 T 500 150"
        stroke="url(#lineGrad2)"
        strokeDasharray="600"
        strokeDashoffset="0"
        className="animate-[dash_6s_linear_infinite_reverse]"
      />

      <path
        d="M10 100 Q 150 180 350 120 T 590 100"
        stroke="url(#lineGrad1)"
        strokeLinecap="round"
        opacity="0.5"
      />
    </g>

    {/* Nodes that float slightly */}
    <g
      filter="url(#glowNodes)"
      className="animate-float"
      style={{ animationDuration: '7s' }}
    >
      <circle cx="300" cy="100" r="12" fill="#6366f1" />
      <circle cx="300" cy="100" r="6" fill="#ffffff" />
    </g>

    <g filter="url(#glowNodes)" className="animate-pulse-slow">
      <circle cx="100" cy="50" r="8" fill="#a855f7" />
      <circle cx="100" cy="50" r="4" fill="#ffffff" />

      <circle cx="500" cy="150" r="10" fill="#10b981" />
      <circle cx="500" cy="150" r="5" fill="#ffffff" />

      <circle cx="400" cy="80" r="8" fill="#3b82f6" />
      <circle cx="400" cy="80" r="4" fill="#ffffff" />

      <circle cx="200" cy="108" r="7" fill="#f43f5e" />
      <circle cx="200" cy="108" r="3" fill="#ffffff" />
    </g>

    {/* Floating micro elements */}
    <g className="animate-bounce" style={{ animationDuration: '6s' }}>
      <rect
        x="520"
        y="40"
        width="8"
        height="8"
        rx="2"
        fill="#818cf8"
        opacity="0.6"
        transform="rotate(45 524 44)"
      />
    </g>
    <g
      className="animate-bounce"
      style={{ animationDuration: '4s', animationDelay: '1s' }}
    >
      <rect
        x="60"
        y="150"
        width="10"
        height="10"
        rx="3"
        fill="#34d399"
        opacity="0.6"
        transform="rotate(15 65 155)"
      />
    </g>

    <style>
      {`
        @keyframes dash {
          to {
            stroke-dashoffset: 600;
          }
        }
      `}
    </style>
  </svg>
);

export default SvgConnections;
