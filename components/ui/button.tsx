import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "success" | "ghost";
    size?: "sm" | "md" | "lg";
}

export function Button({
    children,
    className = "",
    variant = "primary",
    size = "md",
    ...props
}: ButtonProps) {
    const baseStyle =
        "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        ghost: "bg-transparent border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:ring-zinc-400 active:scale-[0.98]",
        primary:
            "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 focus:ring-zinc-900 dark:focus:ring-zinc-100 shadow-sm hover:shadow active:scale-[0.98]",
        secondary:
            "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 focus:ring-zinc-400 border border-zinc-200 dark:border-zinc-700 active:scale-[0.98]",
        danger: "bg-red-600 text-white hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-400 focus:ring-red-500 shadow-sm active:scale-[0.98]",
        success:
            "bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 focus:ring-emerald-500 shadow-sm active:scale-[0.98]",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2.5 text-sm",
        lg: "px-5 py-3 text-base",
    };

    return (
        <button
            className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
