// pages/BooksPage.tsx
"use client";
import { useState } from "react";
import BookFilters from "@/components/BookFilters";
import BookCard from "@/components/BookCard";
import { useBooks } from "@/hooks/useBooks";

function buildOpenLibraryQuery(filters: Record<string, string>) {
    if (filters.title && filters.author)
        return `${filters.title} ${filters.author}`;
    if (filters.title) return filters.title;
    if (filters.author) return filters.author;
    return "";
}

export default function BooksPage() {
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [page, setPage] = useState(1);

    const query = buildOpenLibraryQuery(filters);
    const { books, isLoading, isError, total } = useBooks(query, page);

    return (
        <div>
            <BookFilters
                onFilterChange={(newFilters) => {
                    setFilters(newFilters);
                    setPage(1);
                }}
            />

            <h2 className="text-2xl font-bold mb-6 text-indigo-700">
                Open Library Books
            </h2>

            {isLoading && (
                <div className="flex justify-center items-center h-32">
                    <span className="text-indigo-600 font-semibold text-lg animate-pulse">
                        Loading books...
                    </span>
                </div>
            )}

            {isError && (
                <div className="text-red-600 font-semibold text-center mt-6">
                    Error loading books!
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                {books.map((book: any) => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-gray-300 text-gray-700 font-bold disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page * 20 >= total}
                    className="px-4 py-2 rounded bg-indigo-600 text-white font-bold disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {!isLoading && books.length === 0 && (
                <div className="text-center text-gray-500 mt-12">
                    No books found.
                    <br />
                    Try again later.
                </div>
            )}
        </div>
    );
}
