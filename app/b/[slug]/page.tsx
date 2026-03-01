import { notFound } from 'next/navigation';
import { getShopperBySlug } from '@/app/b/_actions/get-shopper';
import { Button } from '@/app/components/ui/button';
import SimpleHeader from '@/app/b/_components/SimpleHeader';
import ServiceCard from '@/app/b/_components/ServiceCard';
import ShopRating from '@/app/b/_components/ShopRating';
import ShopGallery from '@/app/b/_components/ShopGallery';
import ReviewsSection from '@/app/b/_components/ReviewsSection';
import BusinessInfo from '@/app/b/_components/BusinessInfo';
import ShopAbout from '@/app/b/_components/ShopAbout';
import { getShopperServicesByUserId } from '@/app/b/_actions/get-shopper-services';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const shopper = await getShopperBySlug(slug);
  const shopperServices = await getShopperServicesByUserId(
    shopper?.userId ?? '',
  );

  if (!shopper) notFound();

  return (
    <main className="min-h-screen bg-neutral-50 pt-48 pb-16 text-black">
      <SimpleHeader />

      <div className="mx-auto -mt-16 flex max-w-4xl flex-col items-center gap-4 px-4">
        {/* ── Banner + Logo + Info ── */}
        <div className="relative w-full">
          <img
            src={shopper.bannerUrl}
            className="h-64 w-full rounded-3xl object-cover shadow-md"
          />
          <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%]">
            <img
              src={shopper.logoUrl || shopper.bannerUrl}
              className="h-32 w-32 rounded-full border-4 border-white bg-white object-cover shadow-lg"
            />
          </div>
        </div>

        <div className="h-14" />

        <h1 className="text-center text-2xl font-bold text-neutral-900">
          {shopper.name}
        </h1>

        {shopper.description && (
          <p className="mt-1 max-w-xl text-center text-neutral-500">
            {shopper.description}
          </p>
        )}

        {/* ── Rating ── */}
        <div className="shop-fade-in mt-6 w-full">
          <ShopRating />
        </div>

        {/* ── Sobre ── */}
        <div className="shop-fade-in mt-4 w-full">
          <ShopAbout description={shopper.description} />
        </div>

        {/* ── Links ── */}
        {shopper.links.length > 0 && (
          <div className="shop-fade-in mt-4 flex w-full flex-col gap-2">
            <h2 className="mb-2 text-lg font-semibold text-neutral-900">
              Links
            </h2>
            {shopper.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                className="w-full rounded-xl border border-neutral-200 bg-white py-3 text-center text-sm font-medium text-neutral-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md"
              >
                {link.title}
              </a>
            ))}
          </div>
        )}

        {/* ── Serviços ── */}
        {shopperServices && shopperServices.length > 0 && (
          <div className="shop-fade-in mt-4 w-full">
            <h2 className="mb-4 text-lg font-semibold text-neutral-900">
              Serviços
            </h2>
            <div className="flex flex-col gap-3">
              {shopperServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  shopperId={shopper.userId}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Galeria ── */}
        <div className="shop-fade-in mt-4 w-full">
          <ShopGallery />
        </div>

        {/* ── Avaliações ── */}
        <div className="shop-fade-in mt-4 w-full">
          <ReviewsSection />
        </div>

        {/* ── Informações ── */}
        <div className="shop-fade-in mt-4 w-full">
          <BusinessInfo />
        </div>

        {/* ── Footer ── */}
        <footer className="mt-12 flex flex-col items-center gap-2 text-center">
          <span className="text-xs text-neutral-400">
            Feito com ❤️ por{' '}
            <a
              href="/"
              className="font-medium text-indigo-500 transition-colors hover:text-indigo-600"
            >
              Workly
            </a>
          </span>
        </footer>
      </div>
    </main>
  );
}
