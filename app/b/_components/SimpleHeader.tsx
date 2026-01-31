import Link from "next/link"

export default function SimpleHeader() {
    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-200/50
        ">
            <Link
                href="/"
                className="mx-auto flex h-16 max-w-7xl items-center justify-center text-2xl font-bold tracking-tight text-slate-900"
            >
                Work<span className="text-indigo-600">ly</span>
            </Link>
        </header>
    )
}
