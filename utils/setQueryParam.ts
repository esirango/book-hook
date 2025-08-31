import { useRouter } from "next/navigation";

export default function setQueryParam(
    router: ReturnType<typeof useRouter>,
    paramKey: string,
    searchParams: URLSearchParams,
    value: string | string[]
) {
    const query = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
        // چند مقدار رو با کاما جدا می‌کنیم
        query.set(paramKey, value.join(","));
    } else {
        query.set(paramKey, value);
    }

    router.push(`/books?${query.toString()}`);
}
