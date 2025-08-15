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
        { color: "#F87171", label: "Book 1" },
        { color: "#60A5FA", label: "Book 2" },
        { color: "#34D399", label: "Book 3" },
    ];

    const toggleBooks = () => {
        setBookOrder([bookOrder[1], bookOrder[0], bookOrder[2]]);
        setOpen(!open);
    };

    return (
        <nav className="relative z-50">
            <div className="bg-gradient-to-r from-[#F6F1E7] via-[#F2E8D5] to-[#E8DBC0] dark:from-[#0B1020] dark:via-[#0E1428] dark:to-[#131A2E] shadow-lg relative z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-extrabold tracking-wide text-2xl"
                    >
                        📚 <span>Book Hook</span>
                    </Link>

                    <div className="hidden md:flex gap-6 items-center">
                        {navLinks.map((l) => (
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

            <MobileMenu open={open} setOpen={setOpen} navLinks={navLinks} />
        </nav>
    );
}
