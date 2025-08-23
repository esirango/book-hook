"use client";

import { useState, useEffect, useRef } from "react";
import BookCard from "@/components/books/BookCard";
import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import { useBooks, ITEMS_PER_PAGE } from "@/hooks/useBooks";
import { buildOpenLibraryQuery } from "../../../utils/buildOpenLibraryQuery";
import BookFilters from "@/components/books/filters/BookFilters";
import WoodenLibraryScene from "@/components/Library";

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

            {isError && <WoodenLibraryScene />}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                {books.map((book: any) => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>

            {books.length !== 0 && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    hasNextPage={hasNextPage}
                    totalPages={Math.ceil(total / ITEMS_PER_PAGE)}
                />
            )}

            {!isLoading && books.length === 0 && <WoodenLibraryScene />}
        </div>
    );
}
