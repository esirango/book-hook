import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const ITEMS_PER_PAGE = 20;

export function useBooks(query?: string, page: number = 1) {
    const endpoint = query
        ? `/search.json?q=${encodeURIComponent(query)}&page=${page}`
        : `/subjects/love.json?limit=${ITEMS_PER_PAGE}&offset=${
              (page - 1) * ITEMS_PER_PAGE
          }`;

    const { data, error, isLoading } = useSWR(endpoint, fetcher);

    let books: any[] = [];
    let total = 0;
    let hasNextPage = false;

    if (query && Array.isArray(data?.docs)) {
        books = data.docs.map((b: any) => ({
            key: b.key,
            title: b.title,
            author_name: b.author_name || [],
            first_publish_year: b.first_publish_year,
            cover_id: b.cover_i || null,
        }));
        total = data.numFound || books.length;
        hasNextPage = page * ITEMS_PER_PAGE < total;
    } else if (!query && Array.isArray(data?.works)) {
        books = data.works.map((b: any) => ({
            key: b.key,
            title: b.title,
            author_name: b.authors?.map((a: any) => a.name) || [],
            first_publish_year: b.first_publish_year,
            cover_id: b.cover_id || null,
        }));
        hasNextPage = (data.works?.length ?? 0) === ITEMS_PER_PAGE;
    }

    return {
        books,
        isLoading,
        isError: !!error,
        total,
        ITEMS_PER_PAGE,
        hasNextPage,
    };
}
