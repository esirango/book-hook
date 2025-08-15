"use client";

import React, { use } from "react";
import { useBookDetails } from "@/hooks/useBookDetails";

export default function BookDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);

    const { book, isLoading, isError } = useBookDetails(id);

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-64">
                <span className="text-[var(--accent-light)] dark:text-[var(--accent-dark)] font-semibold text-lg animate-pulse">
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

    const description =
        typeof book.description === "string"
            ? book.description
            : book.description?.value || "No summary available.";

    const authors = Array.isArray(book.authors)
        ? book.authors.map((a: any) => a.name || "Unknown").join(", ")
        : "Unknown";

    const genres = Array.isArray(book.subjects)
        ? book.subjects.join(", ")
        : "Unknown";

    const published =
        book.first_publish_year ||
        book.created?.value?.split("T")[0] ||
        "Unknown";

    return (
        <div className="max-w-3xl mx-auto p-6 bg-[var(--card-bg-light)] dark:bg-[var(--card-bg-dark)] rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={coverUrl}
                    alt={book.title || "Book Cover"}
                    className="w-full md:w-60 max-h-96 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                />
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-3 text-[var(--accent-light)] dark:text-[var(--accent-dark)]">
                            {book.title || "Untitled"}
                        </h1>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Author:</span>{" "}
                            {authors}
                        </p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Genres:</span>{" "}
                            {genres}
                        </p>
                        <p className="mb-2 text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">
                                First Published:
                            </span>{" "}
                            {published}
                        </p>
                        <p className="mb-3 text-gray-800 dark:text-gray-200">
                            <span className="font-semibold">Summary:</span>{" "}
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
