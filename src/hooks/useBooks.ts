import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

export function useBooks(url: string) {
    const { data, error, isLoading } = useSWR(url, fetcher);

    return {
        books: Array.isArray(data?.docs) ? data.docs : [],
        isLoading,
        isError: !!error,
        total: data?.numFound || 0,
    };
}
