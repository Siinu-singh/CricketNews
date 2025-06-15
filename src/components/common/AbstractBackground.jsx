// src/components/common/AbstractBackground.jsx
"use client";

export default function AbstractBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden text-foreground/50 pointer-events-none">
      {/* Pattern 1: Subtle dot grid */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <defs>
          <pattern id="dotGridCricNow" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotGridCricNow)" />
      </svg>
      {/* Pattern 2: Angled lines */}
      <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <defs>
          <pattern id="angledLinesCricNow" width="50" height="50" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="10" x2="50" y2="10" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="30" x2="50" y2="30" stroke="currentColor" strokeWidth="1.5" />
             <line x1="0" y1="50" x2="50" y2="50" stroke="currentColor" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#angledLinesCricNow)" />
      </svg>
       {/* Pattern 3: Larger Circles for depth */}
       <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
            <defs>
                <pattern id="lgCirclePatternCricNow" patternUnits="userSpaceOnUse" width="200" height="200">
                    <circle cx="50" cy="50" r="2" fill="currentColor" />
                    <circle cx="150" cy="150" r="3" fill="currentColor" />
                </pattern>
            </defs>
            <rect fill="url(#lgCirclePatternCricNow)" width="100%" height="100%"/>
        </svg>
    </div>
  );
}
