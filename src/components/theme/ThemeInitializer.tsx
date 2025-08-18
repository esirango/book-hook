"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

export default function ThemeInitializer() {
    const initTheme = useThemeStore((s) => s.initTheme);

    useEffect(() => {
        initTheme(); // مقدار اولیه از cookie خونده میشه
    }, [initTheme]);

    return null; // چیزی رندر نمی‌کنیم
}
