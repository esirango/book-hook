import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useBooks(queryString: string) {
    const { data, error, isLoading } = useSWR(queryString, fetcher);
    return {
        books: data?.docs || [],
        isLoading,
        isError: !!error,
    };
}
