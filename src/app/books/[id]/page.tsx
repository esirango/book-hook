"use client";

import React, { use, useEffect, useState } from "react";
import { useBookDetails } from "@/hooks/useBookDetails";
import BookDetailSkeleton from "@/components/books/shimmer/BookDetailSkeleton";
import { GENRES } from "@/store/genres";
import TagList from "@/components/books/TagList";
import { useRouter, useSearchParams } from "next/navigation";
import setQueryParam from "../../../../utils/setQueryParam";
import { formatDate } from "../../../../utils/formatDate";

export default function BookDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { id } = use(params);
    const { book, authors, isLoading, isError } = useBookDetails(id);

    const [coverUrl, setCoverUrl] = useState("");
    useEffect(() => {
        if (book?.covers) {
            setCoverUrl(
                `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
            );
        } else {
            setCoverUrl("");
        }
    }, [book]);

    useEffect(() => {
        if (!isLoading) {
            if (isError || !book) {
                router.replace("/books");
            }
        }
    }, [isError, book, router, isLoading]);

    if (isLoading) return <BookDetailSkeleton />;

    if (isError || !book) return null;

    const description =
        typeof book.description === "string"
            ? book.description
            : book.description?.value || "No summary available.";

    const subjects = Array.isArray(book.subjects) ? book.subjects : [];
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
        <div className="mx-auto my-10 p-6 bg-[var(--card-bg)] rounded-2xl shadow-lg w-full max-w-6xl">
            <div className="flex flex-col md:flex-row gap-6">
                {coverUrl ? (
                    <img
                        src={coverUrl}
                        alt={book.title || "Book cover"}
                        className="
            w-full          
            md:max-w-[400px] 
            h-auto
            md:max-h-[500px]
            object-contain
            rounded-xl
        "
                        onError={() => setCoverUrl("")}
                    />
                ) : (
                    <div className="flex flex-col h-[200px] w-full md:min-w-[200px] items-center justify-center text-gray-400 dark:text-gray-300">
                        <span className="text-6xl select-none">📖</span>
                    </div>
                )}

                <div className="flex-1 flex flex-col min-w-0">
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

                        <p className="mb-4 flex items-center gap-2">
                            <span className="font-semibold">
                                First Published:
                            </span>
                            <span className="px-3 py-1 rounded-full bg-[var(--secondary-button)]/20 text-[var(--accent)] text-sm font-medium shadow-sm">
                                {formatDate(published)}
                            </span>
                        </p>

                        <div className="text-gray-800 dark:text-gray-200 text-justify leading-relaxed min-w-0 sm:w-full md:w-full lg:w-1/2">
                            <h3 className="font-semibold mb-1">Summary:</h3>
                            <p className="overflow-hidden line-clamp-6">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
