'use client';

import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import type { HTMLAttributes } from 'react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '@/lib/utils';

export interface BarChart3IconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface BarChart3IconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const barVariants: Variants = {
  normal: { pathLength: 1, opacity: 1, transition: { duration: 0.3 } },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.4,
      delay: custom * 0.1,
    },
  }),
};

const BarChart3Icon = forwardRef<BarChart3IconHandle, BarChart3IconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 16, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter],
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave],
    );

    return (
      <div
        className={cn(className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 3v18h18" />
          <motion.path
            d="M18 17V9"
            variants={barVariants}
            animate={controls}
            custom={2}
          />
          <motion.path
            d="M13 17V5"
            variants={barVariants}
            animate={controls}
            custom={1}
          />
          <motion.path
            d="M8 17v-3"
            variants={barVariants}
            animate={controls}
            custom={0}
          />
        </svg>
      </div>
    );
  },
);

BarChart3Icon.displayName = 'BarChart3Icon';

export { BarChart3Icon };
