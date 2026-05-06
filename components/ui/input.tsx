import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({
    label,
    error,
    className = "",
    id,
    ...props
}: InputProps) {
    const inputId = id || React.useId();

    return (
        <div className="flex flex-col w-full gap-1.5">
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
                >
                    {label}
                </label>
            )}
            <input
                id={inputId}
                className={`w-full px-4 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:focus:bg-zinc-950 dark:focus:border-zinc-100 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-50 ${
                    error
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/5"
                        : ""
                } ${className}`}
                {...props}
            />
            {error && (
                <span className="text-xs font-medium text-red-500">
                    {error}
                </span>
            )}
        </div>
    );
}
