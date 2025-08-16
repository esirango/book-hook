"use client";

import { useState, useEffect, useRef } from "react";
import BookFilters from "@/components/BookFilters";
import BookCard from "@/components/BookCard";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { useBooks, ITEMS_PER_PAGE } from "@/hooks/useBooks";

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
    const prevQueryRef = useRef<string>("");

    const query = buildOpenLibraryQuery(filters);

    useEffect(() => {
        if (prevQueryRef.current !== query) {
            setPage(1);
            prevQueryRef.current = query;
        }
    }, [query]);

    const { books, isLoading, isError, hasNextPage, total } = useBooks(
        query,
        page
    );

    return (
        <div className="min-h-screen p-6">
            {!isLoading && (
                <BookFilters
                    onFilterChange={(newFilters) => setFilters(newFilters)}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                {books.map((book: any) => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>

            <Pagination
                page={page}
                setPage={setPage}
                hasNextPage={hasNextPage}
                totalPages={Math.ceil(total / ITEMS_PER_PAGE)}
            />

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
