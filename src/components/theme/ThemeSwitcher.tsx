"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function ThemeSwitcher() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const cookieTheme = Cookies.get("theme");
        if (cookieTheme === "dark") setDark(true);
    }, []);

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add("dark");
            Cookies.set("theme", "dark", { expires: 365 });
        } else {
            document.documentElement.classList.remove("dark");
            Cookies.set("theme", "light", { expires: 365 });
        }
    }, [dark]);

    return (
        <div className="flex items-center justify-center p-1">
            <div
                className="relative w-8 h-12 cursor-pointer"
                onClick={() => setDark(!dark)}
            >
                {/* پایه و دسته چراغ */}
                <div className="absolute bottom-[14px] left-1.5 w-1 h-4 bg-gray-600 origin-bottom rotate-40 z-10"></div>
                <div className="absolute bottom-6 right-[10px] w-1 h-4 bg-gray-600 origin-bottom -translate-x-1/2 -rotate-20 z-10"></div>

                {/* کلاهک چراغ */}
                <div
                    className={`absolute bottom-10 left-2 w-6 h-3 rounded-t-full -translate-x-1/2 bg-gray-500 overflow-hidden rotate-30
            ${dark ? "animate-soft-sway z-10" : "z-10"}`}
                ></div>

                {/* بخش کوچک بالای کلاهک */}
                <div className="absolute bottom-[12px] left-1.5 w-6 h-1 bg-gray-700 -translate-x-1/2 rounded z-10"></div>

                {/* نور مات داخل کلاهک */}
                <div
                    className={`absolute left-0 w-3 h-1.5 rounded-t-full -translate-x-1/2
            ${
                dark
                    ? "bg-yellow-300 opacity-40 blur-sm animate-light-flicker z-50"
                    : "bg-yellow-100 opacity-20 blur-sm z-40"
            }`}
                ></div>

                {/* فقط نیم‌دایره بیرون از کلاهک */}
                <div
                    className={`absolute top-[6.5px] left-[3px] w-3 h-1.5 rotate-29 rounded-b-full -translate-x-1/2
            ${
                dark
                    ? "bg-yellow-400 opacity-100 shadow-[0_0_6px_2px_rgba(255,255,0,0.5)] animate-light-flicker z-50"
                    : "bg-yellow-100 opacity-50 z-40"
            }`}
                ></div>
            </div>
        </div>
    );
}
