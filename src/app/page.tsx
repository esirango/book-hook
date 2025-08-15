import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h1
                className="text-4xl sm:text-5xl font-extrabold mb-4
    text-[var(--accent-light)] dark:text-[var(--accent-dark)]"
            >
                Book Library
            </h1>

            <p
                className="text-lg sm:text-xl mb-6
    text-[var(--text-light)] dark:text-[var(--text-dark)] max-w-2xl"
            >
                Discover and explore books from all around the world...
            </p>

            <Link
                href="/books"
                className="relative px-8 py-3 rounded-xl font-semibold shadow-lg
        hover:shadow-xl hover:scale-105 transition-transform duration-200"
            >
                <span className="absolute inset-0 bg-black/25 rounded-xl"></span>
                <span className="relative bg-gradient-to-r from-[var(--accent-light)] to-[var(--accent-dark)] bg-clip-text text-white">
                    Explore Books
                </span>
            </Link>
        </div>
    );
}
