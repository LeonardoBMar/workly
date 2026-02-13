import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (
  containerRef: RefObject<HTMLElement | null>,
) => {
  useGSAP(
    () => {
      const elements = gsap.utils.toArray('.reveal-on-scroll');

      elements.forEach((element: any) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
            filter: 'blur(5px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    },
    { scope: containerRef },
  );
};
