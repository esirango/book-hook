"use client";
import { useState } from "react";
import BookFilters from "@/components/BookFilters";
import BookCard from "@/components/BookCard";
import { useBooks } from "@/hooks/useBooks";
import Loading from "@/components/Loading";

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
    const { books, isLoading, isError, hasNextPage } = useBooks(query, page);

    return (
        <div className="min-h-screen p-6">
            {!isLoading && (
                <BookFilters
                    onFilterChange={(newFilters) => {
                        setFilters(newFilters);
                        setPage(1);
                    }}
                />
            )}

            {isLoading && (
                <div className="flex justify-center items-center h-full">
                    <Loading />
                </div>
            )}

            {isError && (
                <div className="text-red-600 font-semibold text-center mt-6">
                    Error loading books!
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4 bg-transparent">
                {books.map((book: any) => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded bg-[#8AA278] dark:bg-[#2C4D2D] text-white font-bold disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={!hasNextPage}
                    className="px-4 py-2 rounded bg-[#8AA278] dark:bg-[#2C4D2D] text-white font-bold disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {!isLoading && books.length === 0 && (
                <div className="text-center text-[#355E3B] dark:text-[#A3D9A5] mt-12">
                    No books found.
                    <br />
                    Try again later.
                </div>
            )}
        </div>
    );
}
