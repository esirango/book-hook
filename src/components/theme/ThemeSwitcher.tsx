"use client";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [dark]);

    return (
        <button
            onClick={() => setDark((d) => !d)}
            className="p-2 rounded-full bg-white dark:bg-gray-700 border dark:border-gray-600 shadow fixed bottom-6 right-6 z-50 transition-all hover:scale-110"
            aria-label="Switch theme"
        >
            {dark ? "🌙" : "🌞"}
        </button>
    );
}
