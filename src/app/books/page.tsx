"use client";
import BookCard from "@/components/BookCard";
import { useState } from "react";
import { useBooks } from "@/hooks/useBooks";

export default function BooksPage() {
    const [page, setPage] = useState(1);
    const { books, isLoading, isError, next, previous } = useBooks(page);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">
                All Books
            </h2>
            {isLoading && (
                <div className="flex justify-center items-center h-32">
                    <span className="text-indigo-600 dark:text-indigo-300 font-semibold text-lg animate-pulse">
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
                {books?.map((book: any) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={!previous || page === 1}
                    className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={!next}
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
