"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeSwitcher from "../theme/ThemeSwitcher";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Books" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [bookOrder, setBookOrder] = useState<Array<number>>([0, 1, 2]);

    useEffect(() => setMounted(true), []);
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        if (open) document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    if (!mounted) return null;

    // رنگ‌های جلد کتاب‌ها
    const books = [
        { color: "#F87171", label: "Book 1" },
        { color: "#60A5FA", label: "Book 2" },
        { color: "#34D399", label: "Book 3" },
    ];

    // ترتیب کتاب‌ها روی هم

    const toggleBooks = () => {
        // جابه‌جایی کتاب اول و دوم
        setBookOrder([bookOrder[1], bookOrder[0], bookOrder[2]]);
        setOpen(!open); // باز/بسته کردن منو
    };

    return (
        <nav className="relative z-50">
            {/* Navbar */}
            <div className="bg-gradient-to-r from-[#F6F1E7] via-[#F2E8D5] to-[#E8DBC0] dark:from-[#0B1020] dark:via-[#0E1428] dark:to-[#131A2E] shadow-lg relative z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-extrabold tracking-wide text-2xl"
                    >
                        📚 <span>Book Hook</span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex gap-6 items-center">
                        {NAV_LINKS.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-slate-800/90 hover:text-slate-900 dark:text-slate-100/90 dark:hover:text-white transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                        <ThemeSwitcher />
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden flex items-center gap-3">
                        <ThemeSwitcher />
                        <div
                            className="relative w-12 h-10 cursor-pointer"
                            onClick={toggleBooks}
                        >
                            {bookOrder.map((i, idx) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-12 h-4 rounded shadow-lg"
                                    style={{ backgroundColor: books[i].color }}
                                    animate={{
                                        y: idx * 6,
                                        zIndex: 10 - idx,
                                        rotate:
                                            open && idx === 0
                                                ? -5
                                                : open && idx === 1
                                                ? 5
                                                : 0,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            key="backdrop"
                            className="fixed inset-0 backdrop-blur-sm bg-black/20 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            key="dropdown"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 25,
                            }}
                            className="absolute top-full left-0 w-full md:hidden overflow-hidden bg-gradient-to-b from-[#FFF9EE] via-[#FCF3E2] to-[#F3E6CE] dark:from-[#0E152C] dark:via-[#0B1022] dark:to-[#0A0F1E] shadow-2xl rounded-b-2xl z-40"
                        >
                            <nav className="px-5 py-4">
                                <ul className="space-y-2">
                                    {NAV_LINKS.map((l) => (
                                        <li key={l.href}>
                                            <Link
                                                href={l.href}
                                                onClick={() => setOpen(false)}
                                                className="block px-4 py-2 rounded-lg text-slate-800 dark:text-slate-100 hover:bg-amber-200/60 dark:hover:bg-indigo-900/50 transition-colors"
                                            >
                                                {l.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
}
