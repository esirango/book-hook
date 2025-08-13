import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useBookDetails(workId: string) {
    const { data, error, isLoading } = useSWR(`/works/${workId}.json`, fetcher);
    return {
        book: data,
        isLoading,
        isError: !!error,
    };
}
