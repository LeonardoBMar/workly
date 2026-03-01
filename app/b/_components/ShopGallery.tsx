'use client';

import { useState } from 'react';

const MOCK_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop',
    alt: 'Interior do estabelecimento',
  },
  {
    src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=400&fit=crop',
    alt: 'Área de atendimento',
  },
  {
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop',
    alt: 'Detalhes do ambiente',
  },
  {
    src: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=600&h=400&fit=crop',
    alt: 'Equipamentos profissionais',
  },
  {
    src: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&h=400&fit=crop',
    alt: 'Espaço de espera',
  },
  {
    src: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=600&h=400&fit=crop',
    alt: 'Produtos utilizados',
  },
];

export default function ShopGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="shop-section w-full">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">Galeria</h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {MOCK_IMAGES.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setLightbox(idx)}
            className="group relative aspect-4/3 overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-lg"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="shop-lightbox fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-h-[85vh] max-w-[90vw] sm:max-w-[70vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={MOCK_IMAGES[lightbox].src.replace(
                'w=600&h=400',
                'w=1200&h=800',
              )}
              alt={MOCK_IMAGES[lightbox].alt}
              className="shop-lightbox-img max-h-[85vh] rounded-2xl object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-sm text-white/70">
              {MOCK_IMAGES[lightbox].alt}
            </p>

            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {lightbox > 0 && (
              <button
                onClick={() => setLightbox(lightbox - 1)}
                className="absolute top-1/2 left-0 flex h-10 w-10 -translate-x-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            )}

            {lightbox < MOCK_IMAGES.length - 1 && (
              <button
                onClick={() => setLightbox(lightbox + 1)}
                className="absolute top-1/2 right-0 flex h-10 w-10 translate-x-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
