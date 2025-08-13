import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-900 dark:to-gray-800 shadow-lg">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link
                    href="/"
                    className="text-white text-2xl font-bold tracking-wide"
                >
                    Book Library
                </Link>
                <div className="flex gap-6 items-center">
                    <Link
                        href="/books"
                        className="text-white hover:underline font-medium"
                    >
                        Books
                    </Link>
                </div>
            </div>
        </nav>
    );
}
