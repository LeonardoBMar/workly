import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RefObject } from 'react';

export const useHeroAnimations = (
  containerRef: RefObject<HTMLDivElement | null>,
) => {
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 1,
      })
        .from(
          '.hero-desc',
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6',
        )
        .from(
          '.hero-cta',
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5',
        )
        .from(
          '.hero-trust',
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.4',
        )
        .to(
          '.hero-shape',
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.8',
        )
        .from(
          '.svg-base-line',
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: 'center',
            duration: 0.8,
          },
          '-=0.6',
        )
        .from(
          '.svg-step',
          {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'back.out(1.2)',
          },
          '-=0.8',
        )
        .from(
          '.svg-character',
          {
            y: -30,
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)',
          },
          '-=0.4',
        );
    },
    { scope: containerRef },
  );
};
