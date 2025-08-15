import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import React from "react";

type NavLink = {
    href: string;
    label: string;
};

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
                                {navLinks.map((l) => (
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
    );
}

export default MobileMenu;
