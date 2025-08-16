"use client";

import { GENRES } from "@/store/genres";

export function useGenres() {
    return {
        genres: GENRES,
        isLoading: false,
        isError: false,
    };
}
