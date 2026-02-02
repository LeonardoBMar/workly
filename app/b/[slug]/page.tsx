import { notFound } from "next/navigation"
import { getShopperBySlug } from "@/app/b/_actions/get-shopper"
import { Button } from "@/app/components/ui/button"
import SimpleHeader from "@/app/b/_components/SimpleHeader"
import { getShopperServicesByUserId } from "@/app/b/_actions/get-shopper-services"


export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params

    const shopper = await getShopperBySlug(slug)
    const shopperServices = await getShopperServicesByUserId(shopper?.userId ?? "")

    if (!shopper) notFound()

    return (
        <main className="pt-48 min-h-screen  text-black">
            <SimpleHeader />
            <div className="mx-auto max-w-4xl px-4 -mt-16 flex flex-col items-center gap-4">
                <div className="relative w-full">
                    <img
                        src={shopper.bannerUrl}
                        className="w-full h-64 rounded-3xl object-cover"
                    />

                    <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-[50%]">
                        <img
                            src={shopper.logoUrl || shopper.bannerUrl}
                            className="w-32 h-32 rounded-full border-4 border-neutral-950 object-cover bg-neutral-950"
                        />
                    </div>
                </div>

                <div className="h-14" />

                <h1 className="text-2xl font-semibold text-center">
                    {shopper.name}
                </h1>

                {shopper.description && (
                    <p className="mt-1 text-neutral-400 text-center">
                        {shopper.description}
                    </p>
                )}

                <div className="w-full flex flex-col gap-2 mt-4">
                    {shopper.links.map(link => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            className="w-full rounded-lg bg-neutral-800 py-3 text-center hover:bg-neutral-700 transition"
                        >
                            {link.title}
                        </a>
                    ))}
                </div>

                {shopperServices && (
                    <div className="w-full flex flex-col gap-4 mt-4">
                        {shopperServices.map(service => (
                            <div
                                key={service.id}
                                className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-4 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-base font-semibold text-neutral-900">
                                        {service.name}
                                    </h2>

                                    {service.description && (
                                        <p className="text-sm text-neutral-500">
                                            {service.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-lg font-bold text-neutral-900">
                                        R$ {service.price}
                                    </span>

                                    <Button size="sm">
                                        Agendar
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </main>
    )
}
