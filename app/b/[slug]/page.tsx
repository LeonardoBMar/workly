import { notFound } from 'next/navigation';
import { getShopperBySlug } from '@/app/b/_actions/get-shopper';
import { Button } from '@/app/components/ui/button';
import SimpleHeader from '@/app/b/_components/SimpleHeader';
import ServiceCard from '@/app/b/_components/ServiceCard';
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
    <main className="min-h-screen pt-48 text-black">
      <SimpleHeader />
      <div className="mx-auto -mt-16 flex max-w-4xl flex-col items-center gap-4 px-4">
        <div className="relative w-full">
          <img
            src={shopper.bannerUrl}
            className="h-64 w-full rounded-3xl object-cover"
          />

          <div className="absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-[50%]">
            <img
              src={shopper.logoUrl || shopper.bannerUrl}
              className="h-32 w-32 rounded-full border-4 border-neutral-950 bg-neutral-950 object-cover"
            />
          </div>
        </div>

        <div className="h-14" />

        <h1 className="text-center text-2xl font-semibold">{shopper.name}</h1>

        {shopper.description && (
          <p className="mt-1 text-center text-neutral-400">
            {shopper.description}
          </p>
        )}

        <div className="mt-4 flex w-full flex-col gap-2">
          {shopper.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              className="w-full rounded-lg bg-neutral-800 py-3 text-center transition hover:bg-neutral-700"
            >
              {link.title}
            </a>
          ))}
        </div>

        {shopperServices && (
          <div className="mt-4 flex w-full flex-col gap-4">
            {shopperServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                shopperId={shopper.userId}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
