"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    CreditCard,
    Users,
    Package,
    BarChart3,
    FileText,
    Settings,
    HelpCircle,
    ChevronDown,
    Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const menuItems = [
    { icon: Home, label: "Início", href: "/dashboard" },
    { icon: Calendar, label: "Agenda", href: "/dashboard/agenda" },
    { icon: Users, label: "Clientes", href: "/dashboard/clientes" },
    { icon: Package, label: "Serviços", href: "/dashboard/servicos" },
];

const productItems = [
    { icon: CreditCard, label: "Financeiro", href: "/dashboard/financeiro", hasMore: true },
    { icon: FileText, label: "Faturas", href: "/dashboard/faturas", hasMore: true },
    { icon: BarChart3, label: "Relatórios", href: "/dashboard/relatorios", hasMore: true },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-slate-200/60 bg-white transition-transform duration-300 lg:static lg:flex lg:translate-x-0",
            isOpen ? "translate-x-0 flex" : "-translate-x-full lg:translate-x-0 hidden lg:flex"
        )}>
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-indigo-600 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">W</span>
                    </div>
                    <span className="font-semibold text-slate-900 tracking-tight">workly</span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
                <button
                    onClick={onClose}
                    className="p-1 lg:hidden text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-md"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    pathname === item.href
                                        ? "bg-indigo-50 text-indigo-700"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", pathname === item.href ? "text-indigo-600" : "text-slate-400")} />
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="mt-8 px-3">
                    <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Products</h3>
                    <ul className="space-y-1">
                        {productItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                                        {item.label}
                                    </div>
                                    {item.hasMore && <ChevronDown className="h-3 w-3 text-slate-300" />}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            <div className="border-t border-slate-100 p-4">
                <ul className="space-y-1">
                    <li>
                        <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                            <Settings className="h-4 w-4 text-slate-400" />
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link href="/help" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50">
                            <HelpCircle className="h-4 w-4 text-slate-400" />
                            Help & Support
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}
