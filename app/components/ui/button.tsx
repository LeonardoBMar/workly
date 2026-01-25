import Link from "next/link";
import { cn } from "@/lib/utils"; // I'll check if I need to create lib/utils.ts

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
}

export function Button({
    className,
    variant = "primary",
    size = "md",
    href,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
        primary: "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 hover:shadow-indigo-500/25",
        secondary: "bg-slate-900 text-white shadow-sm hover:bg-slate-800",
        outline: "border-2 border-slate-200 bg-transparent text-slate-900 hover:border-slate-300 hover:bg-slate-50",
        ghost: "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-indigo-600",
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-4 text-base",
    };

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
        return (
            <Link href={href} className={combinedClassName}>
                {props.children}
            </Link>
        );
    }

    return (
        <button className={combinedClassName} {...props}>
            {props.children}
        </button>
    );
}
