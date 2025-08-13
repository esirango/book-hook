import { useState } from "react";

interface Props {
    onFilterChange: (filters: Record<string, string>) => void;
}

export default function BookFilters({ onFilterChange }: Props) {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onFilterChange({
            author,
            title,
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
                className="px-3 py-2 rounded border"
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-3 py-2 rounded border"
            />
            <button
                type="submit"
                className="px-4 py-2 rounded bg-indigo-600 text-white font-bold"
            >
                Search
            </button>
        </form>
    );
}
