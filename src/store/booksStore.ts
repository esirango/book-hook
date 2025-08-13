import { create } from "zustand";

interface Filters {
    genre: string;
    author: string;
    year: string;
    country: string;
    search: string;
}

interface BooksState {
    filters: Filters;
    setFilters: (filters: Partial<Filters>) => void;
}

export const useBooksStore = create<BooksState>((set) => ({
    filters: {
        genre: "",
        author: "",
        year: "",
        country: "",
        search: "",
    },
    setFilters: (filters) =>
        set((state) => ({ filters: { ...state.filters, ...filters } })),
}));
