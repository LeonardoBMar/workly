import Link from "next/link";

const footerLinks = {
    product: [
        { label: "Recursos", href: "/features" },
        { label: "Preços", href: "/pricing" },
        { label: "Integrações", href: "/integrations" },
        { label: "Atualizações", href: "/updates" },
    ],
    company: [
        { label: "Sobre", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Carreiras", href: "/careers" },
        { label: "Contato", href: "/contact" },
    ],
    legal: [
        { label: "Privacidade", href: "/privacy" },
        { label: "Termos", href: "/terms" },
        { label: "Cookies", href: "/cookies" },
        { label: "Licenças", href: "/licenses" },
    ],
    social: [
        { label: "Twitter", href: "https://twitter.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Facebook", href: "https://facebook.com" },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-bold text-white">
                                Workly
                            </span>
                        </Link>
                        <p className="mt-4 text-sm text-slate-400">
                            Simplifique sua gestão de trabalho e aumente sua produtividade com ferramentas inteligentes.
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
                            Produto
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
                            Empresa
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition-colors hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="my-8 border-t border-slate-700"></div>

                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-slate-400">
                        © {new Date().getFullYear()} Workly. Todos os direitos reservados.
                    </p>

                    <div className="flex gap-6">
                        {footerLinks.social.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 transition-colors hover:text-white"
                                aria-label={link.label}
                            >
                                <span className="text-sm">{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
