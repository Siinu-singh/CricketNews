
"use client";

import { useState, useEffect, type FC, useRef } from 'react';
import { cn } from '@/lib/utils.js'; // Explicitly import .js

interface StatItemProps {
  targetDisplayValue: number;
  label: string;
  suffix?: string;
  colorClass?: string;
  duration?: number;
}

const StatItem: FC<StatItemProps> = ({
  targetDisplayValue,
  label,
  suffix = '',
  colorClass = 'text-primary',
  duration = 2000,
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (itemRef.current) { // Check if itemRef.current is not null
            observer.unobserve(itemRef.current); // Animate only once
          }
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the item is visible
      }
    );

    const currentItemRef = itemRef.current;
    if (currentItemRef) {
      observer.observe(currentItemRef);
    }

    return () => {
      if (currentItemRef) {
        observer.unobserve(currentItemRef);
      }
    };
  }, []); // Runs once on mount to set up the observer

  useEffect(() => {
    if (!isVisible) return; // Don't animate if not visible

    let startTimestamp: number | null = null;
    const animationFrame = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const animatedRawValue = progress * targetDisplayValue;

      const targetStr = targetDisplayValue.toString();
      const decimalPointIndex = targetStr.indexOf('.');
      const decimalPlaces = decimalPointIndex >= 0 ? targetStr.length - decimalPointIndex - 1 : 0;
      
      if (decimalPlaces > 0) {
        setCurrentValue(parseFloat(animatedRawValue.toFixed(decimalPlaces)));
      } else {
        setCurrentValue(Math.floor(animatedRawValue));
      }

      if (progress < 1) {
        requestAnimationFrame(animationFrame);
      } else {
        setCurrentValue(targetDisplayValue);
      }
    };
    requestAnimationFrame(animationFrame);

  }, [isVisible, targetDisplayValue, duration]); // Re-run animation if these change *after* becoming visible

  const displayValueFormatted = currentValue.toLocaleString(undefined, {
    minimumFractionDigits: (targetDisplayValue.toString().split('.')[1] || '').length,
    maximumFractionDigits: (targetDisplayValue.toString().split('.')[1] || '').length,
  });

  return (
    <div ref={itemRef} className="flex flex-col items-center text-center p-4">
      <span className={cn("text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2", colorClass)}>
        {displayValueFormatted}{suffix}
      </span>
      <span className="text-sm md:text-base text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );
};

interface AnimatedStatsSectionProps {
  stats: Omit<StatItemProps, 'colorClass'>[];
  backgroundText?: string;
}

const AnimatedStatsSection: FC<AnimatedStatsSectionProps> = ({ stats, backgroundText = "STATS" }) => {
  const themeColorClasses = ['text-accent', 'text-primary', 'text-chart-3', 'text-chart-4', 'text-chart-5'];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none select-none" aria-hidden="true">
        <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-extrabold text-foreground/5 dark:text-foreground/10 opacity-50 leading-none tracking-tighter whitespace-nowrap">
          {backgroundText}
        </h2>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              {...stat}
              colorClass={themeColorClasses[index % themeColorClasses.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStatsSection;
