import { notFound } from "next/navigation"
import { getShopperBySlug } from "@/app/b/_actions/get-shopper"
import { Button } from "@/app/components/ui/button"
import { Card } from "@/app/components/ui/card"
import SimpleHeader from "@/app/b/_components/SimpleHeader"

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params

    const shopper = await getShopperBySlug(slug)
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
                            src={shopper.bannerUrl}
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

                <Button className="w-full max-w-md mt-6">
                    Agendar horário
                </Button>
            </div>
        </main>
    )
}
