import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useBooks(url: string) {
    const { data, error, isLoading } = useSWR(url, fetcher);

    return {
        books: Array.isArray(data?.docs) ? data.docs : [],
        isLoading,
        isError: !!error,
        total: data?.numFound || 0,
    };
}
