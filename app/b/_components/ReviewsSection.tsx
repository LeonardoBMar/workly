'use client';

import { useState } from 'react';

interface Review {
  id: string;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    name: 'Ana Clara',
    avatar: 'AC',
    date: '2 dias atrás',
    rating: 5,
    comment:
      'Atendimento excelente! Fui muito bem recebida e o resultado ficou incrível. Com certeza vou voltar. Super recomendo para quem busca qualidade e profissionalismo.',
  },
  {
    id: '2',
    name: 'Rafael Souza',
    avatar: 'RS',
    date: '1 semana atrás',
    rating: 5,
    comment:
      'Lugar top demais! Ambiente agradável, equipe atenciosa e pontualidade no horário. Nota 10!',
  },
  {
    id: '3',
    name: 'Beatriz Lima',
    avatar: 'BL',
    date: '2 semanas atrás',
    rating: 4,
    comment:
      'Gostei bastante do serviço. O profissional foi atencioso e o resultado ficou ótimo. Só achei que demorou um pouquinho mais do que esperava.',
  },
  {
    id: '4',
    name: 'Carlos Eduardo',
    avatar: 'CE',
    date: '3 semanas atrás',
    rating: 5,
    comment:
      'Melhor experiência que já tive! Preço justo, atendimento nota 1000. Já indiquei para vários amigos.',
  },
  {
    id: '5',
    name: 'Mariana Costa',
    avatar: 'MC',
    date: '1 mês atrás',
    rating: 4,
    comment:
      'Muito bom! Ambiente limpo e organizado. O profissional soube exatamente o que eu queria. Voltarei com certeza.',
  },
  {
    id: '6',
    name: 'Pedro Henrique',
    avatar: 'PH',
    date: '1 mês atrás',
    rating: 5,
    comment:
      'Serviço de primeira qualidade. Saí de lá muito satisfeito. O agendamento online também facilita demais!',
  },
];

const AVATAR_COLORS = [
  'bg-indigo-100 text-indigo-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-cyan-100 text-cyan-700',
  'bg-violet-100 text-violet-700',
];

function MiniStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill={i <= rating ? '#facc15' : '#e5e7eb'}
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.26 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? MOCK_REVIEWS : MOCK_REVIEWS.slice(0, 3);

  return (
    <div className="shop-section w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">
          O que dizem os clientes
        </h2>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
          {MOCK_REVIEWS.length} avaliações
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {visible.map((review, idx) => (
          <div
            key={review.id}
            className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}`}
              >
                {review.avatar}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-neutral-900">
                    {review.name}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {review.date}
                  </span>
                </div>

                <div className="mt-0.5">
                  <MiniStars rating={review.rating} />
                </div>

                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {MOCK_REVIEWS.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full rounded-xl border border-neutral-200 bg-white py-3 text-sm font-medium text-indigo-600 transition-all hover:border-indigo-200 hover:bg-indigo-50"
        >
          {showAll
            ? 'Mostrar menos'
            : `Ver todas as ${MOCK_REVIEWS.length} avaliações`}
        </button>
      )}
    </div>
  );
}
