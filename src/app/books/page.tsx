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

    const booksRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (booksRef.current) {
            booksRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [page]);

    return (
        <div className="min-h-screen p-6" ref={booksRef}>
            {!isLoading && (
                <BookFilters
                    onFilterChange={(newFilters) => setFilters(newFilters)}
                />
            )}

            {isError && <WoodenLibraryScene />}

            <div className="mt-12 min-h-[300px] flex justify-center items-center">
                {isLoading ? (
                    <Loading />
                ) : books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
                        {books.map((book: any) => (
                            <BookCard key={book.key} book={book} />
                        ))}
                    </div>
                ) : (
                    <WoodenLibraryScene />
                )}
            </div>

            {books.length !== 0 && !isLoading && (
                <Pagination
                    page={page}
                    setPage={setPage}
                    hasNextPage={hasNextPage}
                    totalPages={Math.ceil(total / ITEMS_PER_PAGE)}
                />
            )}
        </div>
    );
}
