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
                className="px-3 py-2 rounded-xl border border-[rgba(79,121,66,0.5)]
               bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)]
               text-[var(--input-text-light)] dark:text-[var(--input-text-dark)]
               placeholder-green-400 dark:placeholder-green-500
               focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]
               dark:focus:ring-[var(--accent-dark)] transition-all"
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[rgba(79,121,66,0.5)]
               bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)]
               text-[var(--input-text-light)] dark:text-[var(--input-text-dark)]
               placeholder-green-400 dark:placeholder-green-500
               focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]
               dark:focus:ring-[var(--accent-dark)] transition-all"
            />
            <button
                className="px-4 py-2 rounded-xl
               bg-[var(--accent-light)] dark:bg-[var(--accent-dark)]
               text-white font-bold
               hover:brightness-110 transition-all"
            >
                Search
            </button>
        </form>
    );
}
