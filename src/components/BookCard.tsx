import { useState } from "react";

export default function BookCard({ book }: { book: any }) {
    const [coverUrl, setCoverUrl] = useState(
        book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : ""
    );

    return (
        <div className="border rounded-lg shadow p-4 bg-white flex flex-col">
            <div className="w-full h-48 mb-4 rounded overflow-hidden flex items-center justify-center bg-gray-100">
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={book.title || "Book cover"}
                        className="w-full h-full object-cover"
                        onError={() => {
                            // اگر تصویر خراب بود یا نبود، fallback به استیکر
                            setCoverUrl("");
                        }}
                    />
                ) : (
                    <span className="text-6xl select-none">📖</span>
                )}
            </div>

            <h3 className="font-bold text-lg mb-2 truncate">
                {book.title || "Untitled"}
            </h3>

            <div className="text-sm text-gray-600 mb-2 truncate">
                {book.author_name?.join(", ") || "Unknown author"}
            </div>

            {book.first_publish_year && (
                <div className="text-xs text-gray-500 mb-2">
                    Published: {book.first_publish_year}
                </div>
            )}

            <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-indigo-600 hover:underline truncate"
            >
                More details
            </a>
        </div>
    );
}
