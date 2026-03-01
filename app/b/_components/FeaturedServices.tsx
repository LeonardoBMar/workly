import type { Service } from '@/lib/schema';

interface FeaturedServicesProps {
  services: Service[];
}

export default function FeaturedServices({ services }: FeaturedServicesProps) {
  const featured = services.slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <div className="shop-section w-full">
      <h2 className="mb-4 text-lg font-semibold text-neutral-900">
        Serviços em Destaque
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((service, idx) => (
          <div
            key={service.id}
            className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Badge popular */}
            {idx === 0 && (
              <span className="absolute top-3 right-3 rounded-full bg-linear-to-r from-indigo-500 to-purple-500 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase shadow-sm">
                Popular
              </span>
            )}

            {/* Ícone decorativo */}
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-100">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>

            <h3 className="text-base font-semibold text-neutral-900">
              {service.name}
            </h3>

            {service.description && (
              <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                {service.description}
              </p>
            )}

            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold text-neutral-900">
                R$ {service.price}
              </span>
              <div className="flex items-center gap-1 text-xs text-neutral-400">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {service.duration} min
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
