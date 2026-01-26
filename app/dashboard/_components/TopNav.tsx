"use client";

import { Search, Bell, Settings, HelpCircle, Plus, LayoutGrid, User, LogOut, UserCircle, Menu } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface TopNavProps {
    onMenuClick?: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps) {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-100 bg-white/80 px-4 md:px-8 backdrop-blur-md">
            <div className="flex flex-1 items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-md lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </button>
                <div className="relative w-full max-w-[16rem] md:max-w-96 ">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full  rounded-full bg-slate-200/50 py-1.5 pl-10 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden items-center gap-1 border-l border-slate-100 pl-4 sm:flex">
                    <button className="rounded-md p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900">
                        <LayoutGrid className="h-5 w-5" />
                    </button>
                    <button className="rounded-md p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900">
                        <HelpCircle className="h-5 w-5" />
                    </button>
                    <button className="relative rounded-md p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-600 border-2 border-white"></span>
                    </button>
                    <button className="rounded-md p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900">
                        <Settings className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        className={`h-9 w-9 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-700 font-medium ring-2 transition-all ${isOpen
                            ? 'ring-indigo-500/30 bg-indigo-100 shadow-inner'
                            : 'ring-slate-100 hover:ring-indigo-200'
                            }`}
                    >
                        {session?.user.image ? (
                            <img src={session.user.image} alt={session.user.name} className="h-full w-full rounded-full object-cover" />
                        ) : (
                            <span className="text-sm uppercase">{session?.user.name?.[0] || 'U'}</span>
                        )}
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-full mt-2 w-64 origin-top-right rounded-xl border border-slate-100 bg-white p-2 shadow-2xl transition-all">
                            <div className="px-3 py-3 border-b border-slate-50 mb-1">
                                <p className="text-sm font-semibold text-slate-900 truncate">
                                    {session?.user.name || 'Usuário'}
                                </p>
                                <p className="text-xs text-slate-500 truncate mt-0.5">
                                    {session?.user.email}
                                </p>
                            </div>

                            <div className="py-1">
                                <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors group">
                                    <User className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
                                    <span>Meu Perfil</span>
                                </button>
                                <button className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors group">
                                    <Settings className="h-4 w-4 text-slate-400 group-hover:text-indigo-500" />
                                    <span>Configurações</span>
                                </button>
                            </div>

                            <div className="mt-1 pt-1 border-t border-slate-50">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors group"
                                >
                                    <LogOut className="h-4 w-4 text-rose-400 group-hover:text-rose-600 transition-all" />
                                    <span>Sair da conta</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
