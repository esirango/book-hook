import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

type NavLink = { href: string; label: string };

function MobileMenu({
    open,
    setOpen,
    navLinks,
}: {
    open: boolean;
    setOpen: any;
    navLinks: NavLink[];
}) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 backdrop-blur-sm bg-black/50 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                    />

                    {/* Dropdown Menu */}
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
                        className="
    absolute top-full left-0 w-full md:hidden overflow-hidden
    bg-[var(--menu-bg-light)] dark:bg-[var(--menu-bg-dark)]
    backdrop-blur-sm
    shadow-2xl rounded-b-2xl z-40
  "
                    >
                        <nav className="px-5 py-4">
                            <ul className="space-y-2">
                                {navLinks.map((l) => (
                                    <li key={l.href}>
                                        <Link
                                            href={l.href}
                                            onClick={() => setOpen(false)}
                                            className="
              block px-4 py-2 rounded-lg
              text-gray-900 dark:text-gray-100
              hover:bg-white/30 dark:hover:bg-gray-800/30
              transition-colors font-medium
            "
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
