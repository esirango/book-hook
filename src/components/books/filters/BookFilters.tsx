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
import { useThemeStore } from "@/store/themeStore";

interface Props {
    onFilterChange: (filters: Record<string, string>) => void;
}

export default function BookFilters({ onFilterChange }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialized = useRef(false);
    const { isDark } = useThemeStore();

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

    const styles = {
        form: {
            display: "flex",
            flexWrap: "wrap" as const,
            justifyContent: "center",
            gap: "1rem",
            alignItems: "center",
            marginBottom: "1.5rem",
        },
        input: {
            width: "14rem",
            padding: "0.5rem 0.75rem",
            borderRadius: "0.75rem",
            outline: "none",
            border: `1px solid ${
                isDark ? "var(--accent-dark)" : "var(--accent-light)"
            }`,
            backgroundColor: isDark
                ? "var(--input-bg-dark)"
                : "var(--input-bg-light)",
            color: isDark
                ? "var(--input-text-dark)"
                : "var(--input-text-light)",
            placeholderColor: isDark
                ? "var(--placeholder-dark)"
                : "var(--placeholder-light)",
            transition: "all 0.2s",
        },
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            {/* Author & Title Inputs */}
            {(["author", "title"] as const).map((field) => (
                <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={filters[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    style={styles.input}
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
            {/* Action Buttons */}{" "}
            <div className="flex gap-2">
                {" "}
                <button
                    type="submit"
                    className=" cursor-pointer px-4 py-2 flex items-center gap-2 rounded-xl bg-[var(--link-light)] dark:bg-[var(--link-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] font-bold hover:brightness-110 transition-all "
                >
                    {" "}
                    <Search size={18} /> Search{" "}
                </button>{" "}
                <button
                    type="button"
                    onClick={handleReset}
                    className=" cursor-pointer px-4 py-2 flex items-center gap-2 rounded-xl bg-[var(--bg-light)] dark:bg-[var(--bg-dark)] text-[var(--text-light)] dark:text-[var(--text-dark)] border border-[var(--accent-light)] dark:border-[var(--accent-dark)] font-semibold hover:brightness-105 transition-all "
                >
                    {" "}
                    <RefreshCcw size={18} />{" "}
                </button>{" "}
            </div>{" "}
        </form>
    );
}
