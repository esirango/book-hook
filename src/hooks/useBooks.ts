import useSWR from "swr";
import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useBooks(page: number = 1) {
    const url = `https://gutendex.com/books?page=${page}`;
    const { data, error, isLoading } = useSWR(url, fetcher);

    return {
        books: Array.isArray(data?.results) ? data.results : [],
        isLoading,
        isError: !!error,
        next: data?.next, // برای صفحه‌بندی
        previous: data?.previous,
    };
}
