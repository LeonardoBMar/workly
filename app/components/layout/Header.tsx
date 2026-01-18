"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { label: "Agenda", href: "/schedule" },
    { label: "Clientes", href: "/clients" },
    { label: "Serviços", href: "/services" },
    { label: "Pagamentos", href: "/payments" },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="h-16 border-b border-gray-200 bg-white">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
                <Link
                    href="/"
                    className="text-lg font-semibold text-gray-900"
                >
                    Workly
                </Link>

                <nav className="flex gap-6">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm transition-colors ${isActive
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
