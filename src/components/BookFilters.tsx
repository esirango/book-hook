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
                className="px-3 py-2 rounded-xl
               bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)]
               text-[var(--input-text-light)] dark:text-[var(--input-text-dark)]
               placeholder-[var(--placeholder-light)] dark:placeholder-[var(--placeholder-dark)]
               focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]
               dark:focus:ring-[var(--accent-dark)] transition-all"
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-3 py-2 rounded-xl
               bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)]
               text-[var(--input-text-light)] dark:text-[var(--input-text-dark)]
               placeholder-[var(--placeholder-light)] dark:placeholder-[var(--placeholder-dark)]
               focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]
               dark:focus:ring-[var(--accent-dark)] transition-all"
            />
            <button
                type="submit"
                className="px-4 py-2 rounded-xl
               bg-[var(--link-light)] dark:bg-[var(--link-dark)]
               text-[var(--text-light)] dark:text-[var(--text-dark)]
               font-bold hover:brightness-110 transition-all"
            >
                Search
            </button>
        </form>
    );
}
