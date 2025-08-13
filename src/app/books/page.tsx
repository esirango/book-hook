"use client";
import BookCard from "@/components/BookCard";
import BookFilters from "@/components/BookFilters";
import { useBooks } from "@/hooks/useBooks";
import { useBooksStore } from "@/store/booksStore";

export default function BooksPage() {
    const { filters } = useBooksStore();

    let q: string[] = [];
    if (filters.search) q.push(`q=${filters.search}`);
    if (filters.genre) q.push(`subject=${filters.genre}`);
    if (filters.author) q.push(`author=${filters.author}`);
    if (filters.year) q.push(`first_publish_year=${filters.year}`);
    if (filters.country) q.push(`language=${filters.country}`);
    const queryStr = `/search.json?${q.join("&")}`;

    const { books, isLoading, isError } = useBooks(queryStr);

    return (
        <div>
            <BookFilters />
            {isLoading && <div>در حال بارگذاری...</div>}
            {isError && <div>خطا در دریافت داده‌ها!</div>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {books?.map((book: any) => (
                    <BookCard key={book.key} book={book} />
                ))}
            </div>
        </div>
    );
}
