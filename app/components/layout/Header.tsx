"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LayoutDashboard, User, LogOut, Loader2 } from "lucide-react";
import { useState } from "react";

const navItems = [
    { label: "Recursos", href: "/#features" },
    { label: "Preços", href: "/#pricing" },
    { label: "Sobre", href: "/about" },
];

export default function Header() {
    const pathname = usePathname();
    const { data: session, isPending } = authClient.useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (pathname.startsWith("/dashboard")) {
        return null;
    }

    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/10 glass">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-tight text-slate-900"
                    >
                        Work<span className="text-indigo-600">ly</span>
                    </Link>

                    <nav className="hidden md:flex gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    {isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
                    ) : session ? (
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-200"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                <span className="hidden sm:inline">Dashboard</span>
                            </Link>
                            <button
                                onClick={async () => {
                                    await authClient.signOut();
                                    window.location.href = "/";
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-all"
                                title="Sair"
                            >
                                <LogOut className="h-4 w-4" />
                            </button>
                            <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-indigo-200 uppercase ring-2 ring-white">
                                {session.user.name.charAt(0)}
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 sm:block"
                            >
                                Entrar
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 hover:shadow-indigo-500/25"
                            >
                                Começar grátis
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
