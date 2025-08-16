// utils/buildOpenLibraryQuery.ts
const LANGUAGE_CODES: Record<string, string> = {
    English: "eng",
    French: "fre",
    German: "ger",
    Spanish: "spa",
    Japanese: "jpn",
    Persian: "per",
};

function mapPublishYearRange(range: string) {
    switch (range) {
        case "Before 1900":
            return "first_publish_year:[* TO 1899]";
        case "1900-1950":
            return "first_publish_year:[1900 TO 1950]";
        case "1951-2000":
            return "first_publish_year:[1951 TO 2000]";
        case "2001-2010":
            return "first_publish_year:[2001 TO 2010]";
        case "2011-2020":
            return "first_publish_year:[2011 TO 2020]";
        case "2021-Present":
            return "first_publish_year:[2021 TO *]";
        default:
            return "";
    }
}

export function buildOpenLibraryQuery(filters: Record<string, string>) {
    let parts: string[] = [];

    if (filters.title) parts.push(filters.title);
    if (filters.author) parts.push(filters.author);
    if (filters.genre) parts.push(`subject:${filters.genre}`);
    if (filters.place) parts.push(`place:${filters.place}`);
    if (filters.person) parts.push(`person:${filters.person}`);
    if (filters.time) parts.push(`time:${filters.time}`);

    if (filters.publishYear) {
        const yearQuery = mapPublishYearRange(filters.publishYear);
        if (yearQuery) parts.push(yearQuery);
    }

    if (filters.language) {
        const code = LANGUAGE_CODES[filters.language];
        if (code) parts.push(`language:${code}`);
    }

    return parts.join(" ");
}
