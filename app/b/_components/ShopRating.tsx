const MOCK_RATING = {
  average: 4.8,
  total: 127,
  distribution: [
    { stars: 5, percentage: 72 },
    { stars: 4, percentage: 18 },
    { stars: 3, percentage: 6 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 1 },
  ],
};

function StarIcon({ filled, half }: { filled: boolean; half?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="half-star">
          <stop offset="50%" stopColor="#facc15" />
          <stop offset="50%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
      <path
        d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.26 5.06 16.7 6 11.21l-4-3.9 5.53-.8L10 1.5z"
        fill={half ? 'url(#half-star)' : filled ? '#facc15' : '#e5e7eb'}
      />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          filled={i <= Math.floor(rating)}
          half={i === Math.ceil(rating) && rating % 1 !== 0}
        />
      ))}
    </div>
  );
}

export default function ShopRating() {
  return (
    <div className="shop-section w-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">
        Avaliações
      </h2>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Nota geral */}
        <div className="flex flex-col items-center gap-1 sm:min-w-[120px]">
          <span className="text-5xl font-bold text-neutral-900">
            {MOCK_RATING.average}
          </span>
          <StarRow rating={MOCK_RATING.average} />
          <span className="mt-1 text-sm text-neutral-500">
            {MOCK_RATING.total} avaliações
          </span>
        </div>

        {/* Distribuição */}
        <div className="flex flex-1 flex-col gap-2">
          {MOCK_RATING.distribution.map((row) => (
            <div key={row.stars} className="flex items-center gap-2">
              <span className="w-8 text-right text-sm font-medium text-neutral-600">
                {row.stars}★
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-yellow-400 transition-all duration-700"
                  style={{ width: `${row.percentage}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs text-neutral-400">
                {row.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
