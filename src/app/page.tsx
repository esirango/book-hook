import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-4xl font-bold mb-4 text-indigo-700 dark:text-indigo-300">
                Book Library
            </h1>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-400 max-w-xl text-center">
                Discover and explore books from all around the world. Filter by
                genre, author, language, and more. Click on any book for
                detailed information.
            </p>
            <Link
                href="/books"
                className="bg-indigo-600 text-white px-7 py-3 rounded-xl font-semibold shadow hover:bg-indigo-800 transition"
            >
                Explore Books
            </Link>
        </div>
    );
}
