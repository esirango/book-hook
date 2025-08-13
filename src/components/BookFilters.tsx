"use client";
import { useBooksStore } from "@/store/booksStore";
import { useState } from "react";

export default function BookFilters() {
    const { filters, setFilters } = useBooksStore();
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (e: any) => {
        setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        setFilters(localFilters);
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl flex flex-wrap gap-3 shadow mb-6">
            <input
                name="search"
                type="text"
                placeholder="Search by title or text"
                className="p-2 rounded-md border border-gray-300 dark:border-gray-700 flex-1"
                value={localFilters.search}
                onChange={handleChange}
            />
            <input
                name="author"
                type="text"
                placeholder="Author"
                className="p-2 rounded-md border border-gray-300 dark:border-gray-700 flex-1"
                value={localFilters.author}
                onChange={handleChange}
            />
            <input
                name="genre"
                type="text"
                placeholder="Genre"
                className="p-2 rounded-md border border-gray-300 dark:border-gray-700 flex-1"
                value={localFilters.genre}
                onChange={handleChange}
            />
            <input
                name="year"
                type="number"
                placeholder="Year"
                className="p-2 rounded-md border border-gray-300 dark:border-gray-700 w-28"
                value={localFilters.year}
                onChange={handleChange}
            />
            <input
                name="country"
                type="text"
                placeholder="Language code (en/fa/...)"
                className="p-2 rounded-md border border-gray-300 dark:border-gray-700 w-32"
                value={localFilters.country}
                onChange={handleChange}
            />
            <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
                onClick={applyFilters}
            >
                Filter
            </button>
        </div>
    );
}
