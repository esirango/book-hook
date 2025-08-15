import Link from "next/link";
import { useState } from "react";

export default function BookCard({ book }: { book: any }) {
    const [coverUrl, setCoverUrl] = useState(
        book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
            : ""
    );

    return (
        <div
            className="rounded-xl p-4 bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)]
    flex flex-col transition-all duration-300
    shadow-sm hover:-translate-y-1 hover:shadow-lg"
        >
            <div
                className="w-full h-48 mb-4 rounded overflow-hidden flex items-center justify-center
      bg-[var(--bg-light)] dark:bg-[var(--bg-dark)]"
            >
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={book.title || "Book cover"}
                        className="w-full h-full object-cover"
                        onError={() => setCoverUrl("")}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-300">
                        <span className="text-6xl select-none">📖</span>
                        <span className="text-xs mt-1">No cover</span>
                    </div>
                )}
            </div>
            <h3 className="font-bold text-lg mb-2 truncate">
                {book.title || "Untitled"}
            </h3>
            <div className="text-sm text-[var(--text-light)] dark:text-[var(--text-dark)] mb-2 truncate">
                {book.author_name?.join(", ") || "Unknown author"}
            </div>
            {book.first_publish_year && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    Published: {book.first_publish_year}
                </div>
            )}
            <Link
                href={`/books/${book.key.split("/").pop()}`}
                className="mt-auto text-[var(--accent-light)] dark:text-[var(--accent-dark)] hover:underline truncate"
            >
                More details
            </Link>
        </div>
    );
}
