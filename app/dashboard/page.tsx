"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, LogOut, LayoutDashboard, User, Settings } from "lucide-react";

export default function DashboardPage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [session, isPending, router]);

    if (isPending) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                        <p className="mt-1 text-slate-500">Bem-vindo de volta, {session.user.name}!</p>
                    </div>
                    <button
                        onClick={async () => {
                            await authClient.signOut();
                            router.push("/");
                        }}
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition-all"
                    >
                        <LogOut className="h-4 w-4" />
                        Sair
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <DashboardCard
                        title="Agendamentos"
                        value="12"
                        icon={<LayoutDashboard className="h-6 w-6 text-indigo-600" />}
                        description="Você tem 3 novos agendamentos hoje."
                    />
                    <DashboardCard
                        title="Perfil"
                        value={session.user.name}
                        icon={<User className="h-6 w-6 text-purple-600" />}
                        description={session.user.email}
                    />
                    <DashboardCard
                        title="Configurações"
                        value="Ativo"
                        icon={<Settings className="h-6 w-6 text-slate-600" />}
                        description="Sua conta está em boas condições."
                    />
                </div>
            </div>
        </div>
    );
}

function DashboardCard({ title, value, icon, description }: { title: string; value: string; icon: React.ReactNode; description: string }) {
    return (
        <div className="rounded-2xl border border-white bg-white/60 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 shadow-inner">
                {icon}
            </div>
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</h3>
            <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
    );
}
