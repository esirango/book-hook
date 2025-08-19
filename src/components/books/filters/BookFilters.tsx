"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    PLACES,
    PEOPLE,
    TIMES,
    PUBLISH_YEARS,
    LANGUAGES,
} from "@/store/constants/filterOptions";
import { GENRES } from "@/store/constants/genres";
import CustomSelect from "./CustomSelect";
import { RefreshCcw, Search } from "lucide-react";

interface Props {
    onFilterChange: (filters: Record<string, string>) => void;
}

export default function BookFilters({ onFilterChange }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialized = useRef(false);

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
            className="flex flex-wrap justify-center items-center gap-4 mb-6"
        >
            {/* Author & Title Inputs */}
            {(["author", "title"] as const).map((field) => (
                <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={filters[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    className="
            w-56 px-3 py-2 rounded-xl 
            border border-[var(--accent)] 
            bg-[var(--input-bg)] text-[var(--input-text)] 
            placeholder-[var(--placeholder)]
            focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
            transition
          "
                />
            ))}

            {/* Select Fields */}
            {selectFields.map(({ key, options, placeholder }) => (
                <CustomSelect
                    key={key}
                    value={filters[key]}
                    options={options.map((opt) => ({ value: opt, label: opt }))}
                    placeholder={placeholder}
                    onChange={(val: string) => handleChange(key, val)}
                />
            ))}

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    type="submit"
                    className="
            flex items-center gap-2 px-4 py-2 rounded-xl font-bold
            cursor-pointer transition-all
            bg-[var(--link)] text-[var(--text)]
            hover:brightness-110
          "
                >
                    <Search size={18} /> Search
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="
            flex items-center gap-2 px-4 py-2 rounded-xl font-semibold
            cursor-pointer transition-all
            bg-[var(--bg)] text-[var(--text)] border border-[var(--accent)]
            hover:brightness-105
          "
                >
                    <RefreshCcw size={18} />
                </button>
            </div>
        </form>
    );
}
