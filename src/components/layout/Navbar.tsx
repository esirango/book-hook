"use client";
import Link from "next/link";
import ThemeSwitcher from "../theme/ThemeSwitcher";

export default function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-900 dark:to-gray-800 shadow-lg relative z-10">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-white text-2xl font-bold tracking-wide"
                >
                    Book Library
                </Link>
                <div className="flex gap-6 items-center relative">
                    <Link
                        href="/books"
                        className="text-white hover:underline font-medium"
                    >
                        Books
                    </Link>

                    <div className="relative">
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>
        </nav>
    );
}
