"use client";

import { useThemeStore } from "@/store/themeStore";

import NextTopLoader from "nextjs-toploader";

export default function ProgressBarProvider() {
    const { isDark } = useThemeStore();

    return (
        <NextTopLoader
            color={isDark ? "#759bb2" : "#b3915a"}
            height={3}
            showSpinner={false}
            crawlSpeed={200}
            shadow={false}
        />
    );
}
