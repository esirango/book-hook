"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, RefreshCcw, Search } from "lucide-react";
import CustomSelect from "./CustomSelect";
import {
    PLACES,
    PEOPLE,
    TIMES,
    PUBLISH_YEARS,
    LANGUAGES,
} from "@/store/constants/filterOptions";
import { GENRES } from "@/store/constants/genres";

interface BookFiltersProps {
    onFilterChange: (filters: Record<string, string>) => void;
}

export default function BookFilters({ onFilterChange }: BookFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [openDropdown, setOpenDropdown] = useState(false);

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
        const initial = {
            author: searchParams.get("author") || "",
            title: searchParams.get("title") || "",
            genre: searchParams.get("genre") || "",
            place: searchParams.get("place") || "",
            person: searchParams.get("person") || "",
            time: searchParams.get("time") || "",
            publishYear: searchParams.get("publishYear") || "",
            language: searchParams.get("language") || "",
        };
        setFilters(initial);
        onFilterChange(initial);
    }, []);

    const handleChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.set(key, value);
        });
        router.push(`/books?${queryParams.toString()}`);
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
            className="flex flex-col gap-4 w-full max-w-5xl mx-auto"
        >
            <motion.div
                layout
                initial={{ borderRadius: "1rem" }}
                className="p-5 rounded-2xl shadow-md bg-[var(--filters-bg)]"
            >
                {/* Inputs اولیه */}
                <div className="flex gap-4 lg:flex-row justify-center flex-col items-center">
                    {(["author", "title"] as const).map((field) => (
                        <input
                            key={field}
                            type="text"
                            placeholder={
                                field.charAt(0).toUpperCase() + field.slice(1)
                            }
                            value={filters[field]}
                            onChange={(e) => {
                                handleChange(field, e.target.value);
                            }}
                            className="
                w-full px-3 py-2 rounded-xl 
                border border-[var(--accent)] 
                bg-[var(--input-bg)] text-[var(--input-text)] 
                placeholder-[var(--placeholder)]
                focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                transition
              "
                        />
                    ))}
                    {/* دکمه More Filters */}
                    <button
                        type="button"
                        onClick={() => setOpenDropdown(!openDropdown)}
                        className="flex w-full justify-center items-center gap-2 px-3 py-2 rounded-xl font-medium bg-[var(--accent)] border border-[var(--accent)] text-[var(--text)] hover:brightness-105 transition whitespace-nowrap"
                    >
                        More Filters
                        <ChevronDown
                            size={18}
                            className={`transition-transform ${
                                openDropdown ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                </div>

                {/* Dropdown ها - انیمیشن ارتفاع باکس */}
                <AnimatePresence>
                    {openDropdown && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className=" mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                        >
                            {selectFields.map(
                                ({ key, options, placeholder }) => (
                                    <CustomSelect
                                        key={key}
                                        value={filters[key]}
                                        options={options.map((opt) => ({
                                            value: opt,
                                            label: opt,
                                        }))}
                                        placeholder={placeholder}
                                        onChange={(val) => {
                                            console.log(key);
                                            handleChange(key, val);
                                        }}
                                    />
                                )
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Action Buttons */}
                <div className="flex justify-center gap-3 mt-4">
                    <button type="submit" className="btn-search">
                        <Search size={18} /> Search
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="btn-reset"
                    >
                        <RefreshCcw size={18} className="reset-icon" />
                    </button>
                </div>
            </motion.div>
        </form>
    );
}
