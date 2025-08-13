"use client";
import { useBookDetails } from "@/hooks/useBookDetails";

export default function BookDetailPage({ params }: { params: { id: string } }) {
    const { book, isLoading, isError } = useBookDetails(params.id);

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-64">
                <span className="text-indigo-600 dark:text-indigo-300 font-semibold text-lg animate-pulse">
                    Loading book details...
                </span>
            </div>
        );
    if (isError || !book)
        return (
            <div className="text-red-600 font-semibold text-center mt-16">
                Error or book not found.
            </div>
        );

    const coverId = book.covers?.[0];
    const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : "/placeholder.png";

    // Description: OpenLibrary sometimes returns string, sometimes object { value }
    const description =
        typeof book.description === "string"
            ? book.description
            : book.description?.value || "No summary available.";

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={coverUrl}
                    alt={book.title}
                    className="w-full md:w-56 max-h-80 object-cover rounded-xl shadow"
                />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">
                        {book.title}
                    </h1>
                    <p className="mb-3">
                        <span className="font-semibold">Author:</span>{" "}
                        {book.authors?.map((a: any) => a.name).join(", ") ||
                            "Unknown"}
                    </p>
                    <p className="mb-3">
                        <span className="font-semibold">Genres:</span>{" "}
                        {book.subjects?.join(", ") || "Unknown"}
                    </p>
                    <p className="mb-3">
                        <span className="font-semibold">First Published:</span>{" "}
                        {book.first_publish_year || "Unknown"}
                    </p>
                    <p className="mb-3">
                        <span className="font-semibold">Summary:</span>{" "}
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
