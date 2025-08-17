"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGenres } from "@/hooks/useGenres";
import {
    PLACES,
    PEOPLE,
    TIMES,
    PUBLISH_YEARS,
    LANGUAGES,
} from "@/store/constants/filterOptions";
import CustomSelect from "./books/filters/CustomSelect";
import { GENRES } from "@/store/constants/genres";

interface Props {
    onFilterChange: (filters: Record<string, string>) => void;
}

export default function BookFilters({ onFilterChange }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialized = useRef(false);
    const { genres } = useGenres();

    const [filters, setFilters] = useState({
        author: "",
        title: "",
        genre: "",
        place: "",
        person: "",
        time: "",
        publishYear: "",
        language: "",
    });

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const initialFilters = { ...filters };
        (Object.keys(initialFilters) as (keyof typeof filters)[]).forEach(
            (key) => {
                initialFilters[key] = searchParams.get(key) || "";
            }
        );

        setFilters(initialFilters);
        onFilterChange(initialFilters);
    }, []);

    const handleChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const query = new URLSearchParams();
        Object.entries(filters).forEach(
            ([key, value]) => value && query.set(key, value)
        );
        router.push(`/books?${query.toString()}`);
        onFilterChange(filters);
    };

    const handleReset = () => {
        const resetFilters: typeof filters = {
            author: "",
            title: "",
            genre: "",
            place: "",
            person: "",
            time: "",
            publishYear: "",
            language: "",
        };

        setFilters(resetFilters);
        router.push(`/books`);
        onFilterChange(resetFilters);
    };

    type FilterKey = keyof typeof filters;

    const selectFields: {
        key: FilterKey;
        options: string[];
        placeholder: string;
    }[] = [
        { key: "genre", options: GENRES, placeholder: "Select Genre" },
        { key: "place", options: PLACES, placeholder: "Select Place" },
        { key: "person", options: PEOPLE, placeholder: "Select Person" },
        { key: "time", options: TIMES, placeholder: "Select Time" },
        {
            key: "publishYear",
            options: PUBLISH_YEARS,
            placeholder: "Select Publish Year",
        },
        { key: "language", options: LANGUAGES, placeholder: "Select Language" },
    ];

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-4 items-center mb-6 p-4 bg-[var(--bg-gradient-light)] dark:bg-[var(--bg-gradient-dark)] rounded-xl shadow-md"
        >
            {(["author", "title"] as (keyof typeof filters)[]).map((key) => (
                <input
                    key={key}
                    type="text"
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={filters[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className={`
        px-4 py-2  text-left
        border rounded-xl
        text-[var(--input-text-light)] dark:text-[var(--input-text-dark)]
        placeholder-[var(--placeholder-light)] dark:placeholder-[var(--placeholder-dark)]
        border-[var(--accent-light)] dark:border-[var(--accent-dark)]
        focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] dark:focus:ring-[var(--accent-dark)]
        transition-all
    `}
                />
            ))}

            {selectFields.map(({ key, options, placeholder }) => (
                <CustomSelect
                    key={key}
                    value={filters[key]}
                    options={options.map((opt) =>
                        typeof opt === "string"
                            ? { value: opt, label: opt }
                            : opt
                    )}
                    placeholder={placeholder}
                    onChange={(val: string) => handleChange(key, val)}
                />
            ))}

            <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[var(--link-light)] dark:bg-[var(--link-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] font-bold hover:brightness-110 transition-all"
            >
                Search
            </button>

            <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-[var(--red-light)] dark:bg-[var(--red-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] font-bold hover:brightness-110 flex items-center gap-2 transition-all"
            >
                ⟳ Reset
            </button>
        </form>
    );
}
