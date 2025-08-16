"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    onFilterChange: (filters: { author: string; title: string }) => void;
}

export default function BookFilters({ onFilterChange }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialized = useRef(false);

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");

    const fields = [
        { title: "Author", type: "text", value: author, setValue: setAuthor },
        { title: "Title", type: "text", value: title, setValue: setTitle },
    ];

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const authorParam = searchParams.get("author") || "";
        const titleParam = searchParams.get("title") || "";
        setAuthor(authorParam);
        setTitle(titleParam);

        onFilterChange({ author: authorParam, title: titleParam });
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const query = new URLSearchParams();
        if (author) query.set("author", author);
        if (title) query.set("title", title);

        router.push(`?${query.toString()}`);
        onFilterChange({ author, title });
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-wrap gap-4 items-center mb-6"
        >
            {fields.map((field) => (
                <input
                    key={field.title}
                    type={field.type}
                    placeholder={field.title}
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    className="px-3 py-2 rounded-xl
          bg-[var(--input-bg-light)] dark:bg-[var(--input-bg-dark)]
          text-[var(--input-text-light)] dark:text-[var(--input-text-dark)]
          placeholder-[var(--placeholder-light)] dark:placeholder-[var(--placeholder-dark)]
          focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)]
          dark:focus:ring-[var(--accent-dark)] transition-all"
                />
            ))}
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
