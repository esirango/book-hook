"use client";

import { create } from "zustand";
import Cookies from "js-cookie";

interface ThemeStore {
    isDark: boolean;
    setDark: (value: boolean) => void;
    toggle: () => void;
    initTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    isDark: false,
    setDark: (value) => {
        Cookies.set("theme", value ? "dark" : "light", { expires: 365 });
        if (value) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        set({ isDark: value });
    },
    toggle: () =>
        set((state) => {
            const newValue = !state.isDark;
            Cookies.set("theme", newValue ? "dark" : "light", { expires: 365 });
            if (newValue) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return { isDark: newValue };
        }),
    initTheme: () => {
        const cookieTheme = Cookies.get("theme");
        const isDark = cookieTheme === "dark";
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        set({ isDark });
    },
}));
