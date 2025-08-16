import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export function useBookDetails(workId: string) {
    const {
        data: work,
        error: workError,
        isLoading: isWorkLoading,
    } = useSWR(workId ? `/works/${workId}.json` : null, fetcher);

    const { data: authorNames, error: authorError } = useSWR(
        () =>
            work?.authors
                ? work.authors.map(
                      (a: any) =>
                          `/authors/${a.author.key.replace(
                              "/authors/",
                              ""
                          )}.json`
                  )
                : null,
        async (urls: string[]) => {
            const results = await Promise.all(urls.map((u) => fetcher(u)));
            return results.map((r: any) => r?.name || "Unknown");
        }
    );

    return {
        book: work,
        authors: authorNames,
        isLoading: isWorkLoading,
        isError: !!(workError || authorError),
    };
}
