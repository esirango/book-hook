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
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 fixed bottom-4 left-4 z-50"
        >
            {dark ? "🌙 دارک مود" : "🌞 لایت مود"}
        </button>
    );
}
