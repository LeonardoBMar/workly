import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RefObject } from 'react';

export const useHeroAnimations = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', {
        y: -20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          '.hero-title',
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
          },
          '-=0.3',
        )
        .from(
          '.hero-desc',
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6',
        )
        .from(
          '.hero-buttons',
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6',
        )
        .from(
          '.hero-features',
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
          },
          '-=0.6',
        )
        .from(
          '.hero-visual',
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 1,
            ease: 'power4.out',
          },
          '-=0.6',
        )
        .from(
          '.hero-used-by',
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.2,
          },
          '-=0.8',
        );
    },
    { scope: containerRef },
  );
};
