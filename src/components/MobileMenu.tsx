import { useThemeStore } from "@/store/themeStore";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type NavLink = { href: string; label: string };

import { useEffect, useRef } from "react";

function MobileMenu({
    open,
    setOpen,
    navLinks,
    burgerRef,
}: {
    open: boolean;
    setOpen: any;
    navLinks: NavLink[];
    burgerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const { isDark } = useThemeStore();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                burgerRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !burgerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, setOpen]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 backdrop-blur-sm bg-black/50 md:hidden z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Dropdown Menu */}
                    <motion.div
                        key="dropdown"
                        ref={menuRef}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 25,
                        }}
                        className="absolute top-full left-0 w-full md:hidden overflow-hidden backdrop-blur-sm shadow-2xl rounded-b-2xl z-40"
                        style={{
                            backgroundColor: isDark
                                ? "var(--menu-bg)"
                                : "var(--menu-bg)",
                        }}
                    >
                        <nav className="px-5 py-4">
                            <ul className="space-y-2">
                                {navLinks.map((l) => (
                                    <li key={l.href}>
                                        <Link
                                            href={l.href}
                                            onClick={() => setOpen(false)}
                                            className="block px-4 py-2 rounded-lg hover:bg-white/30 dark:hover:bg-gray-800/30 transition-colors font-medium"
                                            style={{
                                                color: isDark
                                                    ? "var(--text)"
                                                    : "var(--text)",
                                            }}
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
    );
}

export default MobileMenu;
