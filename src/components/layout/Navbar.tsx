"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeSwitcher from "../theme/ThemeSwitcher";
import { motion } from "framer-motion";
import MobileMenu from "../MobileMenu";
import { useThemeStore } from "@/store/themeStore";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "Books" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [bookOrder, setBookOrder] = useState<Array<number>>([0, 1, 2]);

    const burgerRef = useRef<HTMLDivElement>(null);

    const { isDark } = useThemeStore();

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
        { color: "var(--placeholder)", label: "Book 1" },
        { color: "var(--input-bg)", label: "Book 2" },
        { color: "var(--accent)", label: "Book 3" },
    ];

    const handleBurgerClick = () => {
        setOpen((prev) => !prev);
        setBookOrder((prev) => [prev[1], prev[0], prev[2]]);
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md shadow-md">
            <div className="bg-[var(--input-bg)] relative z-50">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    {/* لوگو */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[var(--text)] font-extrabold tracking-wide"
                    >
                        <img
                            src={
                                isDark
                                    ? "/images/icons/logo-dark.png"
                                    : "/images/icons/logo-light.png"
                            }
                            className="w-10"
                            alt="book hook logo"
                        />{" "}
                        <span className="text-[18px] sm:text-2xl">
                            Book Hook
                        </span>
                    </Link>

                    {/* لینک‌ها دسکتاپ */}
                    <div className="hidden md:flex gap-6 items-center">
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className="text-[var(--text)]/90 hover:text-[var(--accent)] font-semibold transition-colors"
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
                            ref={burgerRef}
                            className="relative w-12 h-10 cursor-pointer"
                            onClick={handleBurgerClick}
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
            <MobileMenu
                open={open}
                setOpen={setOpen}
                navLinks={navLinks}
                burgerRef={burgerRef}
            />
        </nav>
    );
}
