"use client";
import { useBookDetails } from "@/hooks/useBookDetails";

export default function BookDetailPage({ params }: { params: { id: string } }) {
    const { book, isLoading, isError } = useBookDetails(params.id);

    if (isLoading) return <div>در حال بارگذاری...</div>;
    if (isError || !book) return <div>خطا یا کتاب یافت نشد.</div>;

    const coverId = book.covers?.[0];
    const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : "/placeholder.png";

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded shadow">
            <img
                src={coverUrl}
                alt={book.title}
                className="w-full max-h-80 object-cover mb-4 rounded"
            />
            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
            <p className="mb-3">
                <span className="font-semibold">نویسنده:</span>{" "}
                {book.authors?.map((a: any) => a.name).join(", ") || "-"}
            </p>
            <p className="mb-3">
                <span className="font-semibold">ژانرها:</span>{" "}
                {book.subjects?.join(", ") || "-"}
            </p>
            <p className="mb-3">
                <span className="font-semibold">سال انتشار:</span>{" "}
                {book.first_publish_year || "-"}
            </p>
            <p className="mb-3">
                <span className="font-semibold">خلاصه داستان:</span>{" "}
                {book.description?.value || book.description || "موجود نیست"}
            </p>
        </div>
    );
}
