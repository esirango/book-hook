"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] py-5 mt-12">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-center items-center">
                <span className="text-sm mt-2 sm:mt-0 flex items-center gap-1 text-center">
                    Made with{" "}
                    <motion.span
                        className="text-red-500 inline-block"
                        animate={{
                            scale: [1, 1.1, 1.1, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "easeInOut",
                        }}
                    >
                        ❤️
                    </motion.span>{" "}
                    by{" "}
                    <Link
                        target="_blank"
                        href={"https://github.com/esirango"}
                        className="font-bold hover:text-[var(--accent-light)] dark:hover:text-[var(--accent-dark)] transition-colors"
                    >
                        esirango
                    </Link>
                </span>
            </div>
        </footer>
    );
}
