"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeSwitcher from "../theme/ThemeSwitcher";
import { motion } from "framer-motion";
import MobileMenu from "../MobileMenu";

const navLinks = [
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

    const books = [
        { color: "var(--placeholder-light)", label: "Book 1" },
        { color: "var(--accent-light)", label: "Book 2" },
        { color: "var(--card-bg-light)", label: "Book 3" },
    ];

    const toggleBooks = () => {
        setBookOrder([bookOrder[1], bookOrder[0], bookOrder[2]]);
        setOpen(!open);
    };

    return (
        <nav className="relative z-50">
            <div className="bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] relative z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    {/* لوگو */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[var(--text-light)] dark:text-[var(--text-dark)] font-extrabold tracking-wide text-2xl"
                    >
                        📔 <span>Book Hook</span>
                    </Link>

                    {/* لینک‌ها دسکتاپ */}
                    <div className="hidden md:flex gap-6 items-center">
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-[var(--text-light)]/90 hover:text-[var(--accent-light)] dark:text-[var(--text-dark)]/90 dark:hover:text-[var(--accent-dark)] transition-colors"
                            >
                                {l.label}
                            </Link>
                        ))}
                        <ThemeSwitcher />
                    </div>

                    {/* موبایل */}
                    <div className="md:hidden flex items-center gap-3">
                        <ThemeSwitcher />
                        <div
                            className="relative w-12 h-10 cursor-pointer"
                            onClick={toggleBooks}
                        >
                            {bookOrder.map((i, idx) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-12 h-4 rounded-2xl"
                                    style={{ backgroundColor: books[i].color }}
                                    animate={{
                                        y: idx * 6,
                                        zIndex: 10 - idx,
                                        rotate: open
                                            ? idx === 0
                                                ? -10
                                                : idx === 1
                                                ? 10
                                                : 0
                                            : 0,
                                        scale: open && idx !== 2 ? 1.05 : 1,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* منوی موبایل */}
            <MobileMenu open={open} setOpen={setOpen} navLinks={navLinks} />
        </nav>
    );
}
