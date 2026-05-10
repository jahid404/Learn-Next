import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <Image
                    className="dark:invert"
                    src="/next.svg"
                    alt="Next.js logo"
                    width={100}
                    height={20}
                    priority
                />
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        A Journey Begins with Next.js
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Let&apos;s start with a simple Todo App to learn Next.js
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
                    <Link
                        className="flex text-sm text-nowrap h-11 items-center justify-center gap-2 rounded-xl bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 transition-all font-semibold active:scale-[0.98] shadow-md"
                        href="/basics"
                    >
                        Basics
                    </Link>
                    <Link
                        className="flex text-sm text-nowrap h-11 items-center justify-center gap-2 rounded-xl bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 transition-all font-semibold active:scale-[0.98] shadow-md"
                        href="/basics/state"
                    >
                        Basics State
                    </Link>
                    <Link
                        className="flex text-sm text-nowrap h-11 items-center justify-center gap-2 rounded-xl bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 transition-all font-semibold active:scale-[0.98] shadow-md"
                        href="/todo"
                    >
                        To-Do App
                    </Link>
                    <Link
                        className="flex text-sm text-nowrap h-11 items-center justify-center gap-2 rounded-xl bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 transition-all font-semibold active:scale-[0.98] shadow-md"
                        href="/counter"
                    >
                        Counter App
                    </Link>
                    <Link
                        className="flex text-sm text-nowrap h-11 items-center justify-center gap-2 rounded-xl bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 transition-all font-semibold active:scale-[0.98] shadow-md"
                        href="/timer"
                    >
                        Stopwatch
                    </Link>
                    <Link
                        className="flex text-sm text-nowrap h-11 items-center justify-center gap-2 rounded-xl bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 transition-all font-semibold active:scale-[0.98] shadow-md"
                        href="/notes"
                    >
                        Notes App
                    </Link>
                    <Link
                        className="flex text-sm text-nowrap h-11 items-center justify-center gap-2 rounded-xl bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 transition-all font-semibold active:scale-[0.98] shadow-md"
                        href="/auth/login"
                    >
                        Authentication (Session)
                    </Link>
                    <Link
                        className="flex text-sm text-nowrap h-11 items-center justify-center gap-2 rounded-xl bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 transition-all font-semibold active:scale-[0.98] shadow-md"
                        href="/auth/login?mode=jwt"
                    >
                        Authentication (JWT)
                    </Link>
                </div>
            </main>
        </div>
    );
}
