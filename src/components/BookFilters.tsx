// components/BookFilters.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGenres } from "@/hooks/useGenres";

const PLACES = ["USA", "UK", "France", "Germany", "Japan"];
const PEOPLE = ["Shakespeare", "Tolstoy", "Hemingway", "Austen"];
const TIMES = ["18th Century", "19th Century", "20th Century", "21st Century"];
const PUBLISH_YEARS = [
    "Before 1900",
    "1900-1950",
    "1951-2000",
    "2001-2010",
    "2011-2020",
    "2021-Present",
];
const LANGUAGES = [
    "English",
    "French",
    "German",
    "Spanish",
    "Japanese",
    "Persian",
];

interface Props {
    onFilterChange: (filters: {
        author: string;
        title: string;
        genre?: string;
        place?: string;
        person?: string;
        time?: string;
        publishYear?: string;
        language?: string;
    }) => void;
}

export default function BookFilters({ onFilterChange }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialized = useRef(false);

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [place, setPlace] = useState("");
    const [person, setPerson] = useState("");
    const [time, setTime] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [language, setLanguage] = useState("");

    const { genres } = useGenres();

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        setAuthor(searchParams.get("author") || "");
        setTitle(searchParams.get("title") || "");
        setGenre(searchParams.get("genre") || "");
        setPlace(searchParams.get("place") || "");
        setPerson(searchParams.get("person") || "");
        setTime(searchParams.get("time") || "");
        setPublishYear(searchParams.get("publishYear") || "");
        setLanguage(searchParams.get("language") || "");

        onFilterChange({
            author: searchParams.get("author") || "",
            title: searchParams.get("title") || "",
            genre: searchParams.get("genre") || "",
            place: searchParams.get("place") || "",
            person: searchParams.get("person") || "",
            time: searchParams.get("time") || "",
            publishYear: searchParams.get("publishYear") || "",
            language: searchParams.get("language") || "",
        });
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const query = new URLSearchParams();
        if (author) query.set("author", author);
        if (title) query.set("title", title);
        if (genre) query.set("genre", genre);
        if (place) query.set("place", place);
        if (person) query.set("person", person);
        if (time) query.set("time", time);
        if (publishYear) query.set("publishYear", publishYear);
        if (language) query.set("language", language);

        router.push(`/books?${query.toString()}`);
        onFilterChange({
            author,
            title,
            genre,
            place,
            person,
            time,
            publishYear,
            language,
        });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-4 items-center mb-6"
        >
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] text-[var(--input-text-light)] dark:text-[var(--input-text-dark)] placeholder-[var(--placeholder-light)] dark:placeholder-[var(--placeholder-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] dark:focus:ring-[var(--accent-dark)] transition-all"
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] text-[var(--input-text-light)] dark:text-[var(--input-text-dark)] placeholder-[var(--placeholder-light)] dark:placeholder-[var(--placeholder-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] dark:focus:ring-[var(--accent-dark)] transition-all"
            />
            <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] text-[var(--input-text-light)] dark:text-[var(--input-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] dark:focus:ring-[var(--accent-dark)] transition-all"
            >
                <option value="">Select Genre</option>
                {genres.map((g) => (
                    <option key={g} value={g}>
                        {g}
                    </option>
                ))}
            </select>
            <select
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] text-[var(--input-text-light)] dark:text-[var(--input-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] dark:focus:ring-[var(--accent-dark)] transition-all"
            >
                <option value="">Select Place</option>
                {PLACES.map((p) => (
                    <option key={p} value={p}>
                        {p}
                    </option>
                ))}
            </select>

            <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] text-[var(--input-text-light)] dark:text-[var(--input-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] dark:focus:ring-[var(--accent-dark)] transition-all"
            >
                <option value="">Select Time</option>
                {TIMES.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>
            <select
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] text-[var(--input-text-light)] dark:text-[var(--input-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] dark:focus:ring-[var(--accent-dark)] transition-all"
            >
                <option value="">Select Publish Year</option>
                {PUBLISH_YEARS.map((y) => (
                    <option key={y} value={y}>
                        {y}
                    </option>
                ))}
            </select>
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)] text-[var(--input-text-light)] dark:text-[var(--input-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] dark:focus:ring-[var(--accent-dark)] transition-all"
            >
                <option value="">Select Language</option>
                {LANGUAGES.map((l) => (
                    <option key={l} value={l}>
                        {l}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[var(--link-light)] dark:bg-[var(--link-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] font-bold hover:brightness-110 transition-all"
            >
                Search
            </button>
        </form>
    );
}
