"use client";

import React, { use } from "react";
import { useBookDetails } from "@/hooks/useBookDetails";
import BookDetailSkeleton from "@/components/books/shimmer/BookDetailSkeleton";
import { GENRES } from "@/store/genres";
import TagList from "@/components/books/TagList";
import { useRouter, useSearchParams } from "next/navigation";
import setQueryParam from "../../../../utils/setQueryParam";

export default function BookDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { id } = use(params);
    const { book, authors, isLoading, isError } = useBookDetails(id);

    if (isLoading) return <BookDetailSkeleton />;

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

    const subjects = Array.isArray(book.subjects) ? book.subjects : [];
    // فقط ژانرهایی که در لیست ثابت هستند
    const genres = subjects.filter((s: string) => GENRES.includes(s));
    const themes = subjects.filter((s: string) =>
        /(love|revenge|adultery|dream|customs|conditions)/i.test(s)
    );
    const places = book.subject_places || [];
    const people = book.subject_people || [];
    const times = book.subject_times || [];

    const published =
        book.first_publish_year ||
        book.created?.value?.split("T")[0] ||
        "Unknown";

    return (
        <div className="max-w-3xl mx-auto p-6 bg-[var(--card-bg)] dark:bg-[var(--card-bg)] rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={coverUrl}
                    alt={book.title || "Book Cover"}
                    className="w-full md:w-60 max-h-96 object-cover rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                />
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-3 text-[var(--accent)]">
                            {book.title || "Untitled"}
                        </h1>
                        <button
                            className="mb-4"
                            onClick={() =>
                                setQueryParam(
                                    router,
                                    "author",
                                    searchParams,
                                    authors || []
                                )
                            }
                        >
                            <span className="font-semibold">Author:</span>{" "}
                            {authors?.join(", ") || "Unknown"}
                        </button>

                        <TagList
                            title="Genres"
                            items={genres}
                            paramKey="genre"
                        />
                        <TagList
                            title="Themes"
                            items={themes}
                            paramKey="theme"
                        />
                        <TagList
                            title="Places"
                            items={places}
                            paramKey="place"
                        />
                        <TagList
                            title="People"
                            items={people}
                            paramKey="person"
                        />
                        <TagList title="Times" items={times} paramKey="time" />

                        <p className="mb-4 text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">
                                First Published:
                            </span>{" "}
                            {published}
                        </p>

                        <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
                            <h3 className="font-semibold mb-1">Summary:</h3>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
