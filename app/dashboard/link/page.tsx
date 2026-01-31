import { LinkForm } from "./_components/LinkForm";
import { getMyShopper } from "./_actions/manage-link";

export default async function LinkPage() {
    const { data: shopper } = await getMyShopper();

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        Página do Estabelecimento
                    </h1>
                    <p className="text-slate-500">
                        Gerencie as informações públicas do seu estabelecimento
                    </p>
                </div>
            </header>

            <div className="pt-4">
                <LinkForm initialData={shopper} />
            </div>
        </div>
    );
}
