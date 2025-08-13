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
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded flex flex-wrap gap-2">
            <input
                name="search"
                type="text"
                placeholder="جستجوی عنوان یا متن"
                className="p-2 rounded border"
                value={localFilters.search}
                onChange={handleChange}
            />
            <input
                name="author"
                type="text"
                placeholder="نویسنده"
                className="p-2 rounded border"
                value={localFilters.author}
                onChange={handleChange}
            />
            <input
                name="genre"
                type="text"
                placeholder="ژانر"
                className="p-2 rounded border"
                value={localFilters.genre}
                onChange={handleChange}
            />
            <input
                name="year"
                type="number"
                placeholder="سال انتشار"
                className="p-2 rounded border"
                value={localFilters.year}
                onChange={handleChange}
            />
            <input
                name="country"
                type="text"
                placeholder="کد زبان (en/fa/...)"
                className="p-2 rounded border"
                value={localFilters.country}
                onChange={handleChange}
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={applyFilters}
            >
                اعمال فیلترها
            </button>
        </div>
    );
}
