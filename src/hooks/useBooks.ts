// hooks/useBooks.ts
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useBooks(query?: string, page: number = 1) {
    const endpoint = query
        ? `/search.json?q=${query}&page=${page}`
        : `/subjects/popular.json?limit=20&page=${page}`;

    const { data, error, isLoading } = useSWR(endpoint, fetcher);

    let books: any[] = [];
    let total = 0;

    if (query && Array.isArray(data?.docs)) {
        books = data.docs.map((b: any) => ({
            key: b.key,
            title: b.title,
            author_name: b.author_name || [],
            first_publish_year: b.first_publish_year,
            cover_id: b.cover_i || null,
        }));
        total = data.numFound || books.length;
    } else if (!query && Array.isArray(data?.works)) {
        books = data.works.map((b: any) => ({
            key: b.key,
            title: b.title,
            author_name: b.authors?.map((a: any) => a.name) || [],
            first_publish_year: b.first_publish_year,
            cover_id: b.cover_id || null,
        }));
        total = books.length;
    }

    return {
        books,
        isLoading,
        isError: !!error,
        total,
    };
}
